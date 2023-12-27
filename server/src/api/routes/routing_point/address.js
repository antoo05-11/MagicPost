import {
    Router
} from "express";


import catchAsync from "../../exceptions/catch-async";
import { getAddress, getCostEstimation } from "../../controllers/routing_point/address";
import { verifyToken } from "../../middlewares/verify";
import { validate } from "../../middlewares/validation/validate";
import { cost_estimation_schema } from "../../middlewares/validation/address";

const addressRoute = Router();

addressRoute.get("/:id/info", catchAsync(getAddress));

addressRoute.get("/getCostEstimation", (req, res, next) => validate(req.body, res, next, cost_estimation_schema), catchAsync(getCostEstimation));

export default addressRoute;