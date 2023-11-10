import { Commune, District, Province } from './address';

const db = require('../../models');

const Transaction = db.transaction_points;
const Address = db.addresses;

Transaction.belongsTo(Address, { foreignKey: 'addressID' });
export const getAllTransactionPoints = async (req, res) => {
    let transactionPoints = await Transaction.findAll({
        attributes: ['transactionPointID', 'addressID'],
        include: [{
            model: Address,
            required: true,
            attributes: ['detail'],
            include: [{
                model: Commune,
                required: true,
                attributes: ['name']
            }, {
                model: District,
                required: true,
                attributes: ['name']
            }, {
                model: Province,
                required: true,
                attributes: ['name']
            }]
        }]
    });

    let response = [];
    for (const transactionPoint of transactionPoints) {
        response.push({
            transactionPoint: transactionPoint.transactionPointID,
            zipcode: transactionPoint.zipcode,
            name: transactionPoint.name,
            goodsPointID: transactionPoint.goodsPointID,
            address: {
                detail: transactionPoint.address.detail,
                commune: transactionPoint.address.commune.name,
                district: transactionPoint.address.district.name,
                province: transactionPoint.address.province.name
            }
        });
    }

    res.status(200).json(response);
};