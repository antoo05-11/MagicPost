import { Router } from "express";

import catchAsync from "../../exceptions/catch-async";
import { verifyToken } from "../../middlewares/verify";
import { getProfitStatistic } from "../../controllers/order/statistic";

const statisticRoute = Router();

statisticRoute.get("/profit", verifyToken,
    catchAsync(getProfitStatistic));

export default statisticRoute;