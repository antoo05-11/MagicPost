import { Commune } from "../../models/model-export";

export const getAllCommunes = async (req, res) => {
    const communes = await Commune.findAll();
    return res.status(200).json(communes);
}

export const getAllCommunesByDistrictID = async (req, res) => {
    const communes = await Commune.findAll({ where: { districtID: req.params.districtID } });
    return res.status(200).json(communes);
}