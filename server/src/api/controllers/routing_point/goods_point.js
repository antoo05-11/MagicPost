import { role } from '../../models/human/role';
import { Address, Commune, District, Employee, GoodsPoint, Process, Province, RoutingPoint } from '../../models/model-export';

export const getAllGoodsPointWithStatistics = async (req, res) => {
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
                    where: { role: role.GOODS_POINT_HEAD },
                    required: false,
                    attributes: ['fullName', 'employeeID']
                },
                {
                    model: RoutingPoint,
                    include: {
                        model: Address,
                        attributes: ['detail'],
                        include: [
                            { model: Commune, attributes: ['name'] },
                            { model: District, attributes: ['name'] },
                            { model: Province, attributes: ['name'] }
                        ]
                    },
                    attributes: ['routingPointID']
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

    return res.json(result);
};