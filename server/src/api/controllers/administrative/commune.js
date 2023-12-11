const db = require('../../models')
export const Commune = db.communes;

export const getAllCommunes = async (req, res) => {
    Commune.findAll().then(result => {
        res.json(result);
    })
}

export const getAllCommunesByDistrictID = async (req, res) => {
    const communes = await Commune.findAll({ where: { districtID: req.params.districtID } });
    if (!communes) return res.status(404);
    return res.status(200).json(communes);
}