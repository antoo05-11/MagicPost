import {
    Router
} from "express";


import catchAsync from "../../exceptions/catch-async";
import { getAddressByID } from "../../controllers/routing_point/address";
import { verifyToken } from "../../middlewares/verify";

const addressRoute = Router();

addressRoute.get("/:id/info",verifyToken, catchAsync(getAddressByID));

export default addressRoute;