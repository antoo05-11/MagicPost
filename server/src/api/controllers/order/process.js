import Error from '../../exceptions/error';
import { sequelize } from '../../models';
import { buildAddressString } from '../routing_point/address';
import { findNextRoutingPoint } from '../routing_point/routing_point';

const db = require('../../models');
const Order = db.orders;
const Address = db.addresses;
const Process = db.processes;
const RoutingPoint = db.routing_points;
const Commune = db.communes;
const District = db.districts;
const Province = db.provinces;

Process.belongsTo(RoutingPoint, { foreignKey: 'routingPointID' });
RoutingPoint.belongsTo(Address, { foreignKey: 'addressID' });
Address.belongsTo(Commune, { foreignKey: 'communeID' });
Commune.belongsTo(District, { foreignKey: 'districtID' });
District.belongsTo(Province, { foreignKey: 'provinceID' });

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
            (process.status == 'arriving' && status == 'forwarded')) {
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
                }, { transaction: t })
            }
        }

        else if (status == 'on_stock') {
            process.arrivedTime = Date.now()
        }

        await process.save({ transaction: t });
        await t.commit();

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