const db = require('../../models')
export const District = db.districts;

export const getAllDistricts = async (req, res) => {
    District.findAll().then(result => {
        res.json(result);
    })
}