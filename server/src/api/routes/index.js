import {
    Router
} from "express";

import authRoute from "./auth";
import userRoute from "./user";
import administrativeRoute from "./administrative";
import addressRoute from "./routing_point/address";
import goodsPointRoute from "./routing_point/goods_point";
import transactionPointRoute from "./routing_point/transaction_point";

const router = Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/administrative", administrativeRoute);
router.use("/address", addressRoute);
router.use("/goodsPoint", goodsPointRoute);
router.use("/transactionPoint", transactionPointRoute);

export default router;