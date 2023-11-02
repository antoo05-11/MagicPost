import {
    Router
} from "express";

import provinceRoute from "./administrative/province";
import districtRoute from "./administrative/district";
import communeRoute from "./administrative/commune";

const administrativeRoute = Router();

administrativeRoute.use("/province", provinceRoute);
administrativeRoute.use("/district", districtRoute);
administrativeRoute.use("/commune", communeRoute);

export default administrativeRoute;