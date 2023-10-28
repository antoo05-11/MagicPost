const db = require('../models')
export const Address = db.addresses;
export const Commune = db.communes;
export const District = db.districts;
export const Province = db.provinces;

Address.belongsTo(Commune, { foreignKey: 'communeID' });
Address.belongsTo(District, { foreignKey: 'districtID' });
Address.belongsTo(Province, { foreignKey: 'provinceID' });
District.belongsTo(Province, { foreignKey: 'provinceID' });


const request = require('request');
const parseString = require('xml2js').parseString;


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
                    province: result.district.province.name,
                    district: result.district.name,
                    commune: result.commune.name,
                    detail: result.dataValues.detail,
                    exactPostion: result.dataValues.exactPosition
                }

                const origin = response.detail + ',' + response.commune + ','
                    + response.district + ',' + response.province + ',VietNam';
                const destination = 'Số  3 Đường Xuân Thủy' + ',' + response.commune + ','
                + response.district + ',' + response.province + ',VietNam';

                const url = encodeURI(`http://dev.virtualearth.net/REST/V1/Routes/Driving?o=xml&wp.0=${origin}&wp.1=${destination}&key=${process.env.BING_MAP_API_KEY}`);
                console.log(url);
                request(url, (error, response, body) => {
                    if (!error && response.statusCode == 200) {
                        parseString(body, (err, result) => {
                            if (err) {
                                console.error(err);
                                return;
                            }
                            const travelDistance = result.Response.ResourceSets[0].ResourceSet[0].Resources[0].Route[0].TravelDistance[0];

                            console.log('TravelDistance:', travelDistance);
                        });
                    } else {
                        console.log('API calling error: ', error);
                    }
                });
                res.json(response);

            } else {
                res.status(404);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

export const addNewAddress = async(req, res) => {

}