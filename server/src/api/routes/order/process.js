import { Router } from "express";

import { createOrder, getOrdersByWorkingRouteID, getOrderByID, getOrderByIDForCustomer } from "../../controllers/order/order";
import catchAsync from "../../exceptions/catch-async";
import { verifyToken } from "../../middlewares/verify";
import { role } from "../../models/human/role";
import { authorize } from "../../middlewares/authorize";
import { editProcess } from "../../controllers/order/process";

const processRoute = Router();

processRoute.put("/:id/edit", verifyToken,
    (req, res, next) => authorize(req, res, next,
        [role.TRANSACTION_POINT_EMPLOYEE, role.TRANSACTION_POINT_HEAD,
        role.GOODS_POINT_EMPLOYEE, role.GOODS_POINT_HEAD]),
    catchAsync(editProcess));

export default processRoute;