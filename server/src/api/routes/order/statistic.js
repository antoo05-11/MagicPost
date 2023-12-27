import { Router } from "express";

import catchAsync from "../../exceptions/catch-async";
import { verifyToken } from "../../middlewares/verify";
import { getProfitStatistic } from "../../controllers/order/statistic";
import { validate } from "../../middlewares/validation/validate";
import { profit_statistic_schema } from "../../middlewares/validation/statistic";

const statisticRoute = Router();

statisticRoute.get("/profit", verifyToken,
    (req, res, next) => validate(req.query, res, next, profit_statistic_schema),
    catchAsync(getProfitStatistic));

export default statisticRoute;