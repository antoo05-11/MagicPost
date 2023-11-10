import {
    Router
} from "express";


import catchAsync from "../../exceptions/catch-async";
import { getAllCommunes, getAllCommunesByDistrictID } from "../../controllers/administrative/commune";

const communeRoute = Router();

communeRoute.get("/getAll", catchAsync(getAllCommunes));
communeRoute.get("/getAll/:districtID", catchAsync(getAllCommunesByDistrictID));

export default communeRoute;