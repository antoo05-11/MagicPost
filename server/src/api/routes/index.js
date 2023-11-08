import {
    Router
} from "express";

import authRoute from "./auth";
import administrativeRoute from "./administrative";
import addressRoute from "./routing_point/address";
import goodsPointRoute from "./routing_point/goods_point";
import transactionPointRoute from "./routing_point/transaction_point";
import employeeRoute from "./human/employee";

const router = Router();

router.use("/auth", authRoute);
router.use("/administrative", administrativeRoute);
router.use("/address", addressRoute);
router.use("/goodsPoint", goodsPointRoute);
router.use("/transactionPoint", transactionPointRoute);
router.use("/employee", employeeRoute);

export default router;