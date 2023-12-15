const db = require('../../models')
export const District = db.districts;

export const Province = db.provinces;
export const Route = db.routes;

District.belongsTo(Province, { foreignKey: 'provinceID' });

export const getAllDistricts = async (req, res) => {
    const districts = await District.findAll();
    return res.status(200).json(districts);
}

export const getAllDistrictsByProvinceID = async (req, res) => {
    let districts = await District.findAll({
        where: { provinceID: req.params.provinceID }
    })
    return res.status(200).json(districts);
}