import { Router } from "express";

import catchAsync from "../../exceptions/catch-async";
import { verifyToken } from "../../middlewares/verify";
import { getGoodsPointsStatistic, getProfitStatistic, getTransactionPointStatistic } from "../../controllers/order/statistic";
import { validate } from "../../middlewares/validation/validate";
import { statistic_schema } from "../../middlewares/validation/statistic";

const statisticRoute = Router();

statisticRoute.get("/profit", verifyToken,
    (req, res, next) => validate(req.query, res, next, statistic_schema),
    catchAsync(getProfitStatistic));

statisticRoute.get("/goodspoints", verifyToken,
    (req, res, next) => validate(req.query, res, next, statistic_schema),
    catchAsync(getGoodsPointsStatistic));

statisticRoute.get("/transactionpoints", verifyToken,
    (req, res, next) => validate(req.query, res, next, statistic_schema),
    catchAsync(getTransactionPointStatistic));

export default statisticRoute;