const db = require('../models')
export const Address = db.addresses;
export const Commune = db.communes;
export const District = db.districts;
export const Province = db.provinces;

Address.belongsTo(Commune, { foreignKey: 'communeID' });
Address.belongsTo(District, { foreignKey: 'districtID' });
Address.belongsTo(Province, { foreignKey: 'provinceID' });
District.belongsTo(Province, { foreignKey: 'provinceID' });

export const getAddressByID = async (req, res) => {
    Address.findOne({
        where: { addressID: req.params.id },
        include: [
            {
                model: Commune,
                attributes: ['name'],
            },
            {
                model: District,
                attributes: ['name'],
                include: {
                    model: Province,
                    attributes: ['name'],
                },
            },
        ],
    })
        .then((result) => {
            if (result) {
                const response = {
                    province: result.district.province,
                    district: result.district.name,
                    commune: result.commune.name,
                    detail: result.dataValues.detail,
                    exactPostion: result.dataValues.exactPosition
                }
                res.json(response);

            } else {
                res.status(404);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}