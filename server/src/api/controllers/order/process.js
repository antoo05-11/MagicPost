import Error from '../../exceptions/error';
import { sequelize } from '../../models';
import { Address, Commune, District, Order, Process, Province, RoutingPoint } from '../../models/model-export';
import { buildAddressString } from '../routing_point/address';
import { findNextRoutingPoint } from '../routing_point/routing_point';

/**
 * The `updateProcess` function updates the status of a process and performs additional actions based
 * on the new status, such as creating a new process or updating the arrived time, and returns the
 * updated list of processes.
 * @returns a JSON response with the updated processes.
 */
export const updateProcess = async (req, res) => {
    const processID = req.params.id;
    const status = req.query.status;

    const process = await Process.findByPk(processID);
    if (!process) return res.status(400).json(Error.getError(Error.code.invalid_process_id));

    const order = await Order.findByPk(process.orderID);

    const t = await sequelize.transaction();

    try {

        if (process.status == status) {
            return res.status(400).json(Error.getError(Error.code.repeated_data_update));
        }

        if ((process.status == 'forwarded' && status == 'on_stock') ||
            (process.status == 'arriving' && status == 'forwarded') ||
            (process.status == 'arriving' && status == 'customer_sent') ||
            (process.status == 'on_stock' && status == 'customer_sent') ||
            (process.status == 'arriving' && status == 'customer_returned') ||
            (process.status == 'on_stock' && status == 'customer_returned') ||
            (process.status == 'customer_sent' && status == 'customer_returned') ||
            (process.status == 'customer_returned' && status == 'customer_sent')) {
            return res.status(400).json(Error.getError(Error.code.invalid_data_order));
        }

        if (process.status == 'customer_returned' || process.status == 'customer_sent') {
            if(process.routingPointID != order.endTransactionPointID) {
                return res.status(400).json(Error.getError(Error.code.invalid_data_order));
            }
            order.receivedTime = new Date();
        }

        process.status = status;

        if (status == 'customer_sent') {
            order.status = 'delivered';
        }
        else if (status == 'customer_returned') {
            order.status = 'returned';
        }
        else if (status == 'forwarded') {
            const nextRoutingPoint = findNextRoutingPoint(process.routingPointID, order.endTransactionPointID);
            if (nextRoutingPoint) {
                await Process.create({
                    orderID: process.orderID,
                    status: 'arriving',
                    routingPointID: nextRoutingPoint
                }, { transaction: t })
            }
        }

        else if (status == 'on_stock') {
            process.arrivedTime = Date.now()
        }

        await process.save({ transaction: t });
        await order.save({ transaction: t });
        await t.commit({ transaction: t });

        const processes = await Process.findAll({
            where: { orderID: process.orderID },
            order: [['processID', 'DESC']],
            include: {
                model: RoutingPoint,
                include: {
                    model: Address,
                    include: [
                        { model: Commune, attributes: ['name'] },
                        { model: District, attributes: ['name'] },
                        { model: Province, attributes: ['name'] }
                    ],
                    attributes: { exclude: ['addressID', 'communeID', 'districtID', 'provinceID', 'type'] }
                },
                attributes: { exclude: ['routingPointID'] }
            }
        });

        const result = []
        for (let process of processes) {
            process = {
                processID: process.processID,
                routingPointAddress: buildAddressString(process.routing_point.address),
                status: process.status,
                arrivedTime: process.arrivedTime
            }
            result.push(process);
        }

        return res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
        t.rollback();
        return res.status(500).json(Error.buildErrorRes("Internal Server Error"))
    }
}