import {
    Router
} from "express";


import catchAsync from "../../exceptions/catch-async";
import { getAllProvinces } from "../../controllers/administrative/province";

const provinceRoute = Router();

provinceRoute.get("/getAll", catchAsync(getAllProvinces));

export default provinceRoute;