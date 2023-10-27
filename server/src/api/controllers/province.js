const db = require('../models')
export const Province = db.provinces;

export const getAllProvinces = async (req, res) => {
    Province.findAll().then(result => {
        res.json(result);
    })
}