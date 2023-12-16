import { Router } from "express";

import catchAsync from "../../exceptions/catch-async";
import { verifyToken } from "../../middlewares/verify";
import { role } from "../../models/human/role";
import { authorize } from "../../middlewares/authorize";
import { updateProcess } from "../../controllers/order/process";
import { validate } from "../../middlewares/validation/validate";
import { process_updating_schema } from "../../middlewares/validation/process";

const processRoute = Router();

processRoute.put("/:id/update", verifyToken,
    (req, res, next) => authorize(req, res, next,
        [role.TRANSACTION_POINT_EMPLOYEE, role.TRANSACTION_POINT_HEAD,
        role.GOODS_POINT_EMPLOYEE, role.GOODS_POINT_HEAD]),
    (req, res, next) => validate(req.query, res, next, process_updating_schema),
    catchAsync(updateProcess));

export default processRoute;