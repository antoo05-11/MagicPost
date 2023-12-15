import Error from '../../exceptions/error';
import { sequelize } from '../../models';
import { findNextRoutingPoint } from '../routing_point/routing_point';

const db = require('../../models');
const Process = db.processes;
const Order = db.orders;

export const editProcess = async (req, res) => {
    const processID = req.params.id;
    const status = req.query.status;
    const process = await Process.findByPk(processID);
    const order = await Order.findByPk(process.orderID);
    const t = await sequelize.transaction();
    try {
        if (process.status === status) {
            return res.status(400).json(Error.getError(Error.code.repeated_data_update));
        }

        const invalidOrderCondition = (processStatus, targetStatus) => (
            process.status === processStatus && status === targetStatus
        );

        if (invalidOrderCondition('forwarded', 'on_stock') || invalidOrderCondition('forwarded', 'arriving') || invalidOrderCondition('on_stock', 'arriving')) {
            return res.status(400).json(Error.getError(Error.code.invalid_data_order));
        }

        process.status = status;

        if (status == 'forwarded') {
            const nextRoutingPoint = findNextRoutingPoint(process.routingPointID, order.endTransactionPointID);
            if (nextRoutingPoint) {
                await Process.create({
                    orderID: process.orderID,
                    status: 'arriving',
                    routingPointID: nextRoutingPoint
                })
            }

        }

        if (status == 'return') {
            const processes = await Process.findAll({ where: { orderID: process.orderID } });
            if (processes.length == 1) return res.status(400).json(Error.getError(Error.code.no_return_in_root_process))
            await Process.create({
                orderID: process.orderID,
                status: 'arriving',
                routingPointID: 1
            })
        }

        if (status == 'on_stock') {
            process.arrivedTime = Date.now()
        }

        process.save();
        return res.status(200).json(process);
    }
    catch (error) {
        console.log(error);
        t.rollback();
        return res.status(500).json(Error.buildErrorRes("Internal Server Error"))
    }
}