import {
    Router
} from "express";


import catchAsync from "../../exceptions/catch-async";
import { getAllCommunes } from "../../controllers/administrative/commune";

const communeRoute = Router();

communeRoute.get("/getAll", catchAsync(getAllCommunes));

export default communeRoute;