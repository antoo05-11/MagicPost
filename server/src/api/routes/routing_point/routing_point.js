import { getAllRoutingPointCommunes, getAllRoutingPointDistricts, getAllRoutingPointProvinces, getAllRoutingPoints } from "../../controllers/routing_point/routing_point";
import { verifyToken } from "../../middlewares/verify";

const { Router } = require("express");
const { default: catchAsync } = require("../../exceptions/catch-async");

const routingPointRoute = new Router;

routingPointRoute.get("/getAll", verifyToken, catchAsync(getAllRoutingPoints));
routingPointRoute.get("/getAllProvinces", verifyToken, catchAsync(getAllRoutingPointProvinces));
routingPointRoute.get("/getAllDistricts/:provinceID", verifyToken, catchAsync(getAllRoutingPointDistricts));
routingPointRoute.get("/getAllCommunes/:districtID", verifyToken, catchAsync(getAllRoutingPointCommunes));

export default routingPointRoute;