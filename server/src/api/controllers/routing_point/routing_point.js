import { Graph } from '../../../utils/graph';
import { role } from '../../models/human/role';
import { Address, Commune, District, GoodsPoint, Province, Route, RoutingPoint, TransactionPoint } from '../../models/model-export';
import { buildAddressWhereClause } from './address';

const g = new Graph();

/** Querying the database to retrieve all the routes.
 * Once the routes are fetched, it performs the following operations: */
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

/**
 * The function finds the next routing point in a path using Dijkstra's algorithm.
 * @param currentRoutingPointID - The currentRoutingPointID is the ID of the current routing point in
 * the graph. It is the starting point from where you want to find the next routing point.
 * @param endRoutingPointID - The `endRoutingPointID` parameter is the ID of the routing point that you
 * want to reach. It is the destination routing point where you want to find the next routing point
 * towards.
 * @returns the next routing point ID in the path from the current routing point to the end routing
 * point. If there is no next routing point (i.e., the path length is less than or equal to 1), it
 * returns null.
 */
export const findNextRoutingPoint = (currentRoutingPointID, endRoutingPointID) => {
    const path = g.dijkstra(currentRoutingPointID.toString(), endRoutingPointID.toString()).reverse();
    if (path.length > 1) return path[1];
    return null;
}

export const getAllRoutingPointProvinces = async (req, res) => {
    const routingPoints = await RoutingPoint.findAll({
        include: {
            model: Address,
            include: [Province]
        }
    });
    let provinces = new Set();
    for (let routingPoint of routingPoints) {
        routingPoint = { ...routingPoint.get() };
        provinces.add({ ...routingPoint.address.province.get() });
    }
    provinces = [...provinces];
    return res.status(200).json(provinces);
}

export const getAllRoutingPointDistricts = async (req, res) => {
    const addressWhereClause = buildAddressWhereClause({ provinceID: req.params.provinceID });
    const routingPoints = await RoutingPoint.findAll({
        include: {
            model: Address,
            where: addressWhereClause,
            include: [District]
        }
    });
    let districts = new Set();
    for (let routingPoint of routingPoints) {
        routingPoint = { ...routingPoint.get() };
        districts.add({ ...routingPoint.address.district.get() });
    }
    districts = [...districts];
    return res.status(200).json(districts);
}

export const getAllRoutingPointCommunes = async (req, res) => {
    const addressWhereClause = buildAddressWhereClause({ districtID: req.params.districtID });
    const routingPoints = await RoutingPoint.findAll({
        include: {
            model: Address,
            where: addressWhereClause,
            include: {
                model: Commune,
                attributes: ['communeID', 'name']
            }
        }
    });
    let communes = new Set();
    for (let routingPoint of routingPoints) {
        routingPoint = { ...routingPoint.get() };
        communes.add({ ...routingPoint.address.commune.get() });
    }
    communes = [...communes];
    return res.status(200).json(communes);
}

export const getAllRoutingPoints = async (req, res) => {
    const result = [];

    const addressWhereClause = buildAddressWhereClause(req.query);

    const transactionPoints = await TransactionPoint.findAll({
        attributes: ['transactionPointID', 'name'],
        include: [
            {
                model: RoutingPoint,
                include: {
                    model: Address,
                    where: addressWhereClause,
                    required: true,
                    attributes: ['provinceID', 'districtID', 'communeID']
                },
                required: true
            }
        ]
    });

    const goodsPoints = await GoodsPoint.findAll({
        attributes: ['goodsPointID'],
        include: [
            {
                model: RoutingPoint,
                include: {
                    model: Address,
                    where: addressWhereClause,
                    required: true,
                    attributes: ['detail', 'provinceID', 'districtID', 'communeID']
                },
                required: true
            }
        ]
    });

    for (let transactionPoint of transactionPoints) {
        transactionPoint = { ...transactionPoint.get() };

        transactionPoint.routingPointID = transactionPoint.transactionPointID;
        delete transactionPoint.transactionPointID;

        let address = transactionPoint.routing_point.address;
        transactionPoint.address = {
            communeID: address.communeID,
            districtID: address.districtID,
            provinceID: address.provinceID
        }
        delete transactionPoint.routing_point;

        result.push(transactionPoint);
    }

    for (let goodsPoint of goodsPoints) {
        goodsPoint = { ...goodsPoint.get() };

        goodsPoint.routingPointID = goodsPoint.goodsPointID;
        delete goodsPoint.goodsPointID;

        let address = goodsPoint.routing_point.address;
        goodsPoint.address = {
            communeID: address.communeID,
            districtID: address.districtID,
            provinceID: address.provinceID
        }
        goodsPoint.name = `Điểm tập kết tại ${address.detail}`;
        delete goodsPoint.routing_point;

        result.push(goodsPoint);
    }

    return res.status(200).json(result);
}