const db = require('../../models')
export const District = db.districts;

export const Province = db.provinces;
export const Route = db.routes;

District.belongsTo(Province, { foreignKey: 'provinceID' });

export const getAllDistricts = async (req, res) => {
    District.findAll().then(result => {
        res.json(result);
    })
}

export const getAllDistrictsByProvinceID = async (req, res) => {
    let districts = await District.findAll({
        where: { provinceID: req.params.provinceID }
    })
    if (!districts) return res.status(404);
    return res.status(200).json(districts);
}