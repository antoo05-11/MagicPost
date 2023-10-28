import {
    Router
} from "express";

import authRoute from "./auth";
import userRoute from "./user";
import administrativeRoute from "./administrative";
import addressRoute from "./address";

const router = Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/administrative", administrativeRoute);
router.use("/address", addressRoute);

export default router;