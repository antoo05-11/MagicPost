import {
    Router
} from "express";


import catchAsync from "../../exceptions/catch-async";
import { getAllDistricts } from "../../controllers/administrative/district";

const districtRoute = Router();

districtRoute.get("/getAll", catchAsync(getAllDistricts));

export default districtRoute;