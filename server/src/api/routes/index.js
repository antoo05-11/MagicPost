import { Router } from "express";
import authRoute from "./auth";
import administrativeRoute from "./administrative";
import addressRoute from "./routing_point/address";
import goodsPointRoute from "./routing_point/goods_point";
import transactionPointRoute from "./routing_point/transaction_point";
import employeeRoute from "./human/employee";
import orderRoute from "./order/order";
import Error from "../exceptions/error";
import processRoute from "./order/process";
import routingPointRoute from "./routing_point/routing_point";
import statisticRoute from "./order/statistic";

const router = Router();

Error.initErrors();

router.use("/auth", authRoute);
router.use("/administrative", administrativeRoute);
router.use("/address", addressRoute);
router.use("/goodsPoint", goodsPointRoute);
router.use("/transactionPoint", transactionPointRoute);
router.use("/routingPoint", routingPointRoute);

router.use("/employee", employeeRoute);
router.use("/order", orderRoute);
router.use("/process", processRoute);
router.use("/statistic", statisticRoute);

export default router;