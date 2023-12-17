import { Router } from "express";

import { createOrder, getOrdersByWorkingRouteID, getOrderByID, getOrderByIDForCustomer, getOrderCost } from "../../controllers/order/order";
import catchAsync from "../../exceptions/catch-async";
import { verifyToken } from "../../middlewares/verify";
import { role } from "../../models/human/role";
import { authorize } from "../../middlewares/authorize";

const orderRoute = Router();

orderRoute.get("/getAll", verifyToken,
    (req, res, next) => authorize(req, res, next,
        [role.TRANSACTION_POINT_EMPLOYEE, role.TRANSACTION_POINT_HEAD,
        role.GOODS_POINT_EMPLOYEE, role.GOODS_POINT_HEAD]),
    catchAsync(getOrdersByWorkingRouteID));

orderRoute.get("/get/:id", verifyToken,
    (req, res, next) =>
        authorize(req, res, next,
            [role.TRANSACTION_POINT_EMPLOYEE, role.TRANSACTION_POINT_HEAD,
            role.GOODS_POINT_EMPLOYEE, role.GOODS_POINT_HEAD]),
    catchAsync(getOrderByID));

orderRoute.post("/create", verifyToken,
    (req, res, next) => authorize(req, res, next, [role.TRANSACTION_POINT_EMPLOYEE]),
    catchAsync(createOrder));

orderRoute.get("/getOrderCost", verifyToken,
    (req, res, next) => authorize(req, res, next, [role.TRANSACTION_POINT_EMPLOYEE]),
    catchAsync(getOrderCost));

orderRoute.get("/customerGet/:id",
    catchAsync(getOrderByIDForCustomer));

export default orderRoute;