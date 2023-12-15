import { Router } from "express";
import { getAllTransactionPoints, getTransactionPointsByAddressForCustomer } from "../../controllers/routing_point/transaction_point";

const { default: catchAsync } = require("../../exceptions/catch-async");

const transactionPointRoute = new Router();

transactionPointRoute.get("/getAll", catchAsync(getAllTransactionPoints));

transactionPointRoute.get("/customerGet", catchAsync(getTransactionPointsByAddressForCustomer));

export default transactionPointRoute;