import {
    Router
} from "express";

import authRoute from "./auth";
import userRoute from "./user";
import administrativeRouter from "./administrative";

const router = Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/administrative", administrativeRouter);

export default router;