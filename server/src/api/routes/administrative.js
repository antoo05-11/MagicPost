import {
    Router
} from "express";

import provinceRoute from "./administrativeRoute/province";
import districtRoute from "./administrativeRoute/district";
import communeRoute from "./administrativeRoute/commune";

const administrativeRoute = Router();

administrativeRoute.use("/province", provinceRoute);
administrativeRoute.use("/district", districtRoute);
administrativeRoute.use("/commune", communeRoute);

export default administrativeRoute;