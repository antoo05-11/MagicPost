import { Router } from "express";

import { login, logout, requestRefreshToken } from "../controllers/auth";

import catchAsync from "../exceptions/catch-async";
import { validate } from "../middlewares/validation/validate";
import { login_schema } from "../middlewares/validation/login_schema";

const authRoute = Router();

authRoute.post("/login",
    (req, res, next) => validate(req, res, next, login_schema),
    catchAsync(login));
authRoute.post("/refresh-token", catchAsync(requestRefreshToken));
authRoute.get("/logout", catchAsync(logout))

export default authRoute;