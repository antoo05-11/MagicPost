import { Router } from "express";

import { createOrder, getAllOrders } from "../../controllers/order/order";
import catchAsync from "../../exceptions/catch-async";
import { verifyToken } from "../../middlewares/verify";
import { role } from "../../models/human/role";
import { authorize } from "../../middlewares/authorize";


const orderRoute = Router();

orderRoute.get("/getAll", verifyToken,
    (req, res, next) => authorize(req, res, next, [role.TRANSACTION_POINT_EMPLOYEE, role.TRANSACTION_POINT_HEADER]),
    catchAsync(getAllOrders));
orderRoute.post("/create", verifyToken,
    (req, res, next) => authorize(req, res, next, [role.TRANSACTION_POINT_EMPLOYEE]),
    catchAsync(createOrder));

export default orderRoute;