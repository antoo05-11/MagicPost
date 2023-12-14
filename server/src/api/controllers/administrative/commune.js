const db = require('../../models')
export const Commune = db.communes;

export const getAllCommunes = async (req, res) => {
    const communes = await Commune.findAll();
    if (!communes)
        return res.status(404).json(Error.getError(Error.code.no_record_found));
    return res.status(200).json(communes);
}

export const getAllCommunesByDistrictID = async (req, res) => {
    const communes = await Commune.findAll({ where: { districtID: req.params.districtID } });
    if (!communes) return res.status(404);
    return res.status(200).json(communes);
}