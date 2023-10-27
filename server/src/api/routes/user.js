import {
    Router
} from "express";

import {
    createUser,
    findUser,
    getAllUsers,
    getUser,
} from "../controllers/user";

import catchAsync from "../exceptions/catch-async";

import {
    verifyToken
} from "../middlewares/verify";

const userRoute = Router();

userRoute.get("/", verifyToken, catchAsync(getAllUsers));
userRoute.get("/view/:id", catchAsync(getUser));
userRoute.post("/find", verifyToken, catchAsync(findUser));
userRoute.post("/create", catchAsync(createUser));

export default userRoute;