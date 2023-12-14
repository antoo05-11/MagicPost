const db = require('../../models')
export const Province = db.provinces;

export const getAllProvinces = async (req, res) => {
    const provinces = await Province.findAll();
    if (!provinces)
        return res.status(404).json(Error.getError(Error.code.no_record_found));
    return res.status(200).json(provinces);
}