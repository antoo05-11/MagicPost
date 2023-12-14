import { Op } from 'sequelize';

const db = require('../../models');
export const Address = db.addresses;
export const Commune = db.communes;
export const District = db.districts;
export const Province = db.provinces;
export const Route = db.routes;

Address.belongsTo(Commune, { foreignKey: 'communeID' });
Address.belongsTo(District, { foreignKey: 'districtID' });
Address.belongsTo(Province, { foreignKey: 'provinceID' });
District.belongsTo(Province, { foreignKey: 'provinceID' });

const request = require('request');
const parseString = require('xml2js').parseString;

/**
 * The function `getAddressByID` retrieves an address from the database based on the provided address
 * ID and returns the province, district, commune, and detail of the address.
 * @param addressID - The `addressID` parameter is the unique identifier of the address you want to
 * retrieve. It is used to query the database and find the address with the matching ID.
 * @returns an object that contains the province, district, commune, and detail of the address with the
 * given addressID. If the address is not found, it returns null.
 */
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
            province: {
                name: address.district.province.name
            },
            district: {
                name: address.district.name,
            },
            commune: {
                name: address.commune.name
            },
            detail: address.dataValues.detail
        }
        return response;
    }
    else {
        return null;
    }
}

/**
 * The `findDistance` function calculates the driving distance between two locations using the Bing
 * Maps API.
 * @param originJSON - An object containing the details of the origin location. It has the following
 * properties:
 * @param destinationJSON - The `destinationJSON` parameter is an object that contains the details of
 * the destination location. It should have the following properties:
 * @returns The function `findDistance` returns a Promise.
 */
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

/**
 * The function `checkAddress` is a JavaScript function that checks if an address matches a valid
 * address by comparing the commune, district, and province IDs.
 * @param address - The `address` parameter is an object that contains the following properties:
 * @param validAddress - validAddress is an object that represents a valid address. It contains the
 * following properties:
 * @returns a boolean value. It returns true if the address matches the validAddress, and false
 * otherwise.
 */
export const checkAddress = async (address, validAddress) => {
    let communeID = address.communeID;
    let districtID = address.districtID;
    let provinceID = address.provinceID;

    if (!communeID || !districtID || !provinceID) if (!validAddress) return false;

    if (communeID == validAddress.communeID &&
        districtID == validAddress.districtID &&
        provinceID == validAddress.provinceID) return true;

    if (!communeID) communeID = validAddress.communeID;
    if (!districtID) districtID = validAddress.districtID;
    if (!provinceID) provinceID = validAddress.provinceID;

    let checkAddress = await Commune.findOne({
        where: {
            communeID: communeID
        },
        include: [{
            model: District,
            attributes: ['districtID'],
            include: [{
                model: Province,
                attributes: ['provinceID']
            }]
        }],
        attributes: ['communeID']
    });

    if (checkAddress.district.districtID != districtID
        || checkAddress.district.province.provinceID != provinceID) {
        return false;
    }
    return true;
}

/**
 * The function `buildAddressWhereClause` takes an address object as input 
 * and returns a where clause object for querying addresses
 * based on commune, district, and province IDs.
 * @param address - The `address` parameter is an object that contains the following properties:
 * @returns The function `buildAddressWhereClause` returns an object representing a where clause for
 * querying addresses.
 */
export const buildAddressWhereClause = (address) => {
    const addressWhereClause = { [Op.and]: [] }
    if (address) {
        const communeID = address.communeID;
        const districtID = address.districtID;
        const provinceID = address.provinceID;
        if (communeID) { addressWhereClause[Op.and].push({ communeID: communeID }); }
        if (districtID) { addressWhereClause[Op.and].push({ districtID: districtID }); }
        if (provinceID) { addressWhereClause[Op.and].push({ provinceID: provinceID }); }
    }
    return addressWhereClause;
}