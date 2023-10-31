import {
    Router
} from "express";


import catchAsync from "../../exceptions/catch-async";
import { getAddressByID } from "../../controllers/routing_point/address";

const addressRoute = Router();

addressRoute.get("/:id/info", catchAsync(getAddressByID));

export default addressRoute;