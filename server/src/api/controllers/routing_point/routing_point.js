import { Graph } from '../../../utils/graph';

const db = require('../../models');
const Route = db.routes;

const g = new Graph();

Route.findAll().then((routes) => {
    let vertexList = [];
    for (const route of routes) {
        if (!vertexList.includes(route.originID.toString())) vertexList.push(route.originID.toString())
        if (!vertexList.includes(route.destinationID.toString())) vertexList.push(route.destinationID.toString())
    }

    for (let i = 0; i < vertexList.length; i++) g.addVertex(vertexList[i]);

    for (const route of routes) {
        g.addEdge(route.originID.toString(), route.destinationID.toString(), route.distanceValue);
        g.addEdge(route.destinationID.toString(), route.originID.toString(), route.distanceValue);
    }
});

export const findNextRoutingPoint = (currentRoutingPointID, endRoutingPointID) => {
    const path = g.dijkstra(currentRoutingPointID.toString(), endRoutingPointID.toString()).reverse();
    if(path.length > 1) return path[1];
    return null;
}