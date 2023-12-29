import { Router } from "express";

import catchAsync from "../exceptions/catch-async";
import { verifyToken } from "../middlewares/verify";
import { validate } from "../middlewares/validation/validate";
import { statistic_schema } from "../middlewares/validation/statistic";
import { getGeneralStatistic, getGoodsPointsStatistic, getProfitStatistic, getTransactionPointStatistic } from "../controllers/statistic";
import { authorize } from "../middlewares/authorize";
import { role } from "../models/human/role";

const statisticRoute = Router();

statisticRoute.get("/general", verifyToken,
    (req, res, next) => authorize(req, res, next, [role.MANAGER]),
    catchAsync(getGeneralStatistic));

statisticRoute.get("/profit", verifyToken,
    (req, res, next) => authorize(req, res, next, [role.MANAGER]),
    (req, res, next) => validate(req.query, res, next, statistic_schema),
    catchAsync(getProfitStatistic));

statisticRoute.get("/goodspoints", verifyToken,
    (req, res, next) => authorize(req, res, next, [role.MANAGER, role.GOODS_POINT_HEAD, role.TRANSACTION_POINT_HEAD, role.TRANSACTION_POINT_EMPLOYEE]),
    (req, res, next) => validate(req.query, res, next, statistic_schema),
    catchAsync(getGoodsPointsStatistic));

statisticRoute.get("/transactionpoints", verifyToken,
    (req, res, next) => authorize(req, res, next, [role.MANAGER, role.GOODS_POINT_HEAD, role.TRANSACTION_POINT_HEAD,role.GOODS_POINT_EMPLOYEE]),
    (req, res, next) => validate(req.query, res, next, statistic_schema),
    catchAsync(getTransactionPointStatistic));

export default statisticRoute;