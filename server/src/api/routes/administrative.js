import {
    Router
} from "express";

import provinceRoute from "./administrativeRoute/province";
import districtRoute from "./administrativeRoute/district";
import communeRoute from "./administrativeRoute/commune";

const administrativeRouter = Router();

administrativeRouter.use("/province", provinceRoute);
administrativeRouter.use("/district", districtRoute);
administrativeRouter.use("/commune", communeRoute);

export default administrativeRouter;