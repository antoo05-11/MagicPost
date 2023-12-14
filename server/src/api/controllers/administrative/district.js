import Error from '../../exceptions/error';

const db = require('../../models')
export const District = db.districts;

export const Province = db.provinces;
export const Route = db.routes;

District.belongsTo(Province, { foreignKey: 'provinceID' });

export const getAllDistricts = async (req, res) => {
    const districts = await District.findAll();
    if (!districts)
        return res.status(404).json(Error.getError(Error.code.no_record_found));
    return res.status(200).json(districts);
}

export const getAllDistrictsByProvinceID = async (req, res) => {
    let districts = await District.findAll({
        where: { provinceID: req.params.provinceID }
    })
    if (!districts)
        return res.status(404).json(Error.getError(Error.code.invalid_district_id));
    return res.status(200).json(districts);
}