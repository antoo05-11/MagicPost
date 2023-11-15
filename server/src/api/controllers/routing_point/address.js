const db = require('../../models');
export const Address = db.addresses;
export const Commune = db.communes;
export const District = db.districts;
export const Province = db.provinces;
export const Route = db.routes;

import { Op } from 'sequelize';

Address.belongsTo(Commune, { foreignKey: 'communeID' });
Address.belongsTo(District, { foreignKey: 'districtID' });
Address.belongsTo(Province, { foreignKey: 'provinceID' });
District.belongsTo(Province, { foreignKey: 'provinceID' });

const request = require('request');
const parseString = require('xml2js').parseString;

export const getAddressByID = async (addressID) => {
    let address = await Address.findOne({
        where: { addressID: addressID },
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
    });
    if (address) {
        const response = {
            province: address.district.province.name,
            district: address.district.name,
            commune: address.commune.name,
            detail: address.dataValues.detail,
            exactPostion: address.dataValues.exactPosition
        }
        return response;
    }
    else {
        return null;
    }
}

export const findDistance = (originJSON, destinationJSON) => {
    return new Promise((resolve, reject) => {
        let origin = originJSON.detail + ',' + originJSON.commune + ','
            + originJSON.district + ',' + originJSON.province + ',VietNam';

        origin = origin.replaceAll('Quận', '');
        origin = origin.replaceAll('Phường', '');
        origin = origin.replaceAll('Thành phố', '');

        let destination = destinationJSON.detail + ',' + destinationJSON.commune + ','
            + destinationJSON.district + ',' + destinationJSON.province + ',VietNam';

        destination = destination.replaceAll('Quận', '');
        destination = destination.replaceAll('Phường', '');
        destination = destination.replaceAll('Thành phố', '');

        const url = encodeURI(`http://dev.virtualearth.net/REST/V1/Routes/Driving?o=xml&wp.0=${origin}&wp.1=${destination}&key=${process.env.BING_MAP_API_KEY}`);
        console.log(url);
        request(url, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                parseString(body, (err, result) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                        return;
                    }
                    const travelDistance = result.Response.ResourceSets[0].ResourceSet[0].Resources[0].Route[0].TravelDistance[0];
                    resolve(travelDistance);
                });
            } else {
                console.log('API calling error: ', error);
                reject(error);
            }
        });
    });
}

export const addNewAddress = async (address) => {
    const newAddress = await Address.create(address);
    // const tmp = await Address.findOne({
    //     where: { addressID: newAddress.null },
    //     include: [
    //         {
    //             model: Commune,
    //             attributes: ['name'],
    //         },
    //         {
    //             model: District,
    //             attributes: ['name'],
    //             include: {
    //                 model: Province,
    //                 attributes: ['name'],
    //             },
    //         },
    //     ],
    // })
    // const newAddressJSON = {
    //     commune: tmp.commune.name,
    //     district: tmp.district.name,
    //     province: tmp.district.province.name
    // }
    // let distances = [];
    // if (newAddress) {
    //     const addresses = await Address.findAll({
    //         attributes: ['addressID', 'detail'],
    //         include: [
    //             {
    //                 model: Commune,
    //                 attributes: ['name'],
    //             },
    //             {
    //                 model: District,
    //                 attributes: ['name'],
    //             },
    //             {
    //                 model: Province,
    //                 attributes: ['name'],
    //             },
    //         ],
    //         where: {
    //             type: 'goodsPoint',
    //             addressID: {
    //                 [Op.not]: newAddress.null
    //             }
    //         },
    //     });
    //     for (const destination of addresses) {
    //         let destinationJSON = {
    //             commune: destination.commune.name,
    //             district: destination.district.name,
    //             province: destination.province.name
    //         }
    //         let dis = await findDistance(newAddressJSON, destinationJSON);
    //         console.log(dis);

    //         try {
    //             const newDistance = await Route.create({
    //                 originID: newAddress.null,
    //                 destinationID: destination.addressID,
    //                 distanceValue: dis == null ? 0 : dis,
    //             });
    //             distances.push(newDistance);
    //         } catch (error) {
    //             console.error('Error creating distance:', error);
    //         }
    //     }
    //     console.log(distances);
    // } else {
    //     console.log("Error when adding new address!");
    // }
}