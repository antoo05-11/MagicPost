const db = require('../../models')
export const Province = db.provinces;

export const getAllProvinces = async (req, res) => {
    const provinces = await Province.findAll();
    return res.status(200).json(provinces);
}