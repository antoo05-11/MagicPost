import { Router } from "express";

import { changePassword, login, logout, requestRefreshToken } from "../controllers/auth";

import catchAsync from "../exceptions/catch-async";
import { validate } from "../middlewares/validation/validate";
import { login_schema } from "../middlewares/validation/login_schema";
import { verifyToken } from "../middlewares/verify";

const authRoute = Router();

authRoute.post("/login",
    (req, res, next) => validate(req.body, res, next, login_schema),
    catchAsync(login));

authRoute.put("/changePassword", verifyToken, catchAsync(changePassword))

authRoute.post("/refresh-token", catchAsync(requestRefreshToken));

authRoute.get("/logout", catchAsync(logout))

export default authRoute;