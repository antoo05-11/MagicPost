import {
    Router
} from "express";

import authRoute from "./auth";
import userRoute from "./user";
import provinceRoute from "./province";

const router = Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/province", provinceRoute);

export default router;