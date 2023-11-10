import {
    Router
} from "express";


import catchAsync from "../../exceptions/catch-async";
import { getAllDistricts, getAllDistrictsByProvinceID } from "../../controllers/administrative/district";

const districtRoute = Router();

districtRoute.get("/getAll", catchAsync(getAllDistricts));
districtRoute.get("/getAll/:provinceID", catchAsync(getAllDistrictsByProvinceID));

export default districtRoute;