import { Router } from "express";
import { getAllTransactionPoints, getTransactionPointsByAddressForCustomer } from "../../controllers/routing_point/transaction_point";
import { authorize } from "../../middlewares/authorize";
import { role } from "../../models/human/role";
import { verifyToken } from "../../middlewares/verify";

const { default: catchAsync } = require("../../exceptions/catch-async");

const transactionPointRoute = new Router();

transactionPointRoute.get("/getAll",
    verifyToken,
    (req, res, next) => authorize(req, res, next, [role.MANAGER]),
    catchAsync(getAllTransactionPoints));

transactionPointRoute.get("/customerGet", catchAsync(getTransactionPointsByAddressForCustomer));

export default transactionPointRoute;