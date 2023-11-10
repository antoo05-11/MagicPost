import HttpException from '../../exceptions/http-exception';

const db = require('../../models')
export const Commune = db.communes;

export const getAllCommunes = async (req, res) => {
    Commune.findAll().then(result => {
        res.json(result);
    })
}

export const getAllCommunesByDistrictID = async (req, res) => {
    const communes = await Commune.findAll({ where: { districtID: req.params.districtID } });
    if (!communes) throw new HttpException(404, `Cannot find communes by ID ${req.params.districtID}`);
    return res.status(200).json(communes);
}