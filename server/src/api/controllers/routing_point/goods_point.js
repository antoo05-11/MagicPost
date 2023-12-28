import { Op } from 'sequelize';
import { role } from '../../models/human/role';
import { Address, Commune, District, Employee, GoodsPoint, Process, Province, RoutingPoint } from '../../models/model-export';
import { buildAddressWhereClause } from './address';

export const getAllGoodsPointWithStatistics = async (req, res) => {
    let page = parseInt(req.query.page || 1);
    let limit = parseInt(req.query.limit || 8);

    let headName = req.query.headName || '';
    let address = req.query.address || '';

    let sort = req.query.sort || {};

    const addressWhereClause = buildAddressWhereClause(address);

    let goodsPoints = await GoodsPoint.findAll({
        attributes: ['goodsPointID'],
        include:
            [
                {
                    model: Process, required: false,
                    attributes: ['status']
                },
                {
                    model: Employee,
                    where: { role: role.GOODS_POINT_HEAD, fullName: { [Op.like]: `%${headName}%` } },
                    required: true,
                    attributes: ['fullName', 'employeeID']
                },
                {
                    model: RoutingPoint,
                    include: {
                        model: Address,
                        where: addressWhereClause,
                        attributes: ['detail'],
                        include: [
                            { model: Commune, attributes: ['name'] },
                            { model: District, attributes: ['name'] },
                            { model: Province, attributes: ['name'] }
                        ], required: true
                    },
                    attributes: ['routingPointID'],
                    required: true
                }
            ]
    });

    let result = [];
    for (let goodsPoint of goodsPoints) {
        goodsPoint = { ...goodsPoint.get() };

        let onStockOrders = 0;
        let arrivingOrders = 0;
        let forwardedOrders = 0;
        for (let process of goodsPoint.processes) {
            process = { ...process.get() };
            if (process.status == 'arriving') arrivingOrders++;
            if (process.status == 'on_stock') onStockOrders++;
            if (process.status == 'forwarded') forwardedOrders++;
        }

        result.push({
            goodsPointID: goodsPoint.goodsPointID,
            onStockOrders: onStockOrders,
            arrivingOrders: arrivingOrders,
            forwardedOrders: forwardedOrders,
            head: (goodsPoint.employees.length > 0) ? goodsPoint.employees[0] : undefined,
            address: goodsPoint.routing_point.address
        });
    }

    if (sort.onStockOrders) {
        const sortOrder = sort.onStockOrders;
        result.sort(function (a, b) {
            if (sortOrder == 'ASC') return a.onStockOrders - b.onStockOrders;
            return b.onStockOrders - a.onStockOrders;
        })
    }
    else if (sort.arrivingOrders) {
        const sortOrder = sort.arrivingOrders;
        result.sort(function (a, b) {
            if (sortOrder == 'ASC') return a.arrivingOrders - b.arrivingOrders;
            return b.arrivingOrders - a.arrivingOrders;
        })
    }
    else if (sort.forwardedOrders) {
        const sortOrder = sort.forwardedOrders;
        result.sort(function (a, b) {
            if (sortOrder == 'ASC') return a.forwardedOrders - b.forwardedOrders;
            return b.forwardedOrders - a.forwardedOrders;
        })
    }

    const totalPages = Math.ceil(result.length / limit);
    const offset = limit * (page - 1);
    result = result.slice(offset, offset + limit);

    return res.status(200).json({
        totalPages: totalPages,
        limit: limit,
        goodsPoints: result
    });
};