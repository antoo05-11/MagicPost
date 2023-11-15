import { Router } from "express";

import { getAllOrders } from "../../controllers/order/order";
import catchAsync from "../../exceptions/catch-async";

const orderRoute = Router();

orderRoute.get("/getAll", catchAsync(getAllOrders));


export default orderRoute;