import { Province } from "../../models/model-export";

export const getAllProvinces = async (req, res) => {
    const provinces = await Province.findAll();
    return res.status(200).json(provinces);
}