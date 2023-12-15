import {
    Router
} from "express";


import catchAsync from "../../exceptions/catch-async";
import { getAddress } from "../../controllers/routing_point/address";
import { verifyToken } from "../../middlewares/verify";

const addressRoute = Router();

addressRoute.get("/:id/info", catchAsync(getAddress));

export default addressRoute;