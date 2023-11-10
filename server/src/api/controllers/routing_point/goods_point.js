import { Commune, District, Province } from './address';

const db = require('../../models');

const GoodsPoint = db.goods_points;
const Address = db.addresses;

GoodsPoint.belongsTo(Address, { foreignKey: 'addressID' });
export const getAllGoodsPoint = async (req, res) => {
    let goodsPoints = await GoodsPoint.findAll({
        attributes: ['goodsPointID', 'addressID'],
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
    for (const goodsPoint of goodsPoints) {
        response.push({
            goodsPointID: goodsPoint.goodsPointID,
            address: {
                detail: goodsPoint.address.detail,
                commune: goodsPoint.address.commune.name,
                district: goodsPoint.address.district.name,
                province: goodsPoint.address.province.name
            }
        });
    }

    res.json(response);
};