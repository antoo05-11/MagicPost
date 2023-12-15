import Error from '../../exceptions/error';
import { sequelize } from '../../models';

const db = require('../../models');
const Process = db.processes;

export const editProcess = async (req, res) => {
    const processID = req.params.id;
    const status = req.query.status;
    const process = await Process.findByPk(processID);
    const t = await sequelize.transaction();
    try {
        if (process.status == status)
            return res.status(400).json(Error.getError(Error.code.repeated_data_update));
        process.status = status;

        if (status == 'forwarded') {
            await Process.create({
                orderID: process.orderID,
                status: 'arriving',
                routingPointID: 1
            })
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

        process.save();
        return res.status(200).json(process);
    }
    catch (error) {
        console.log(error);
        t.rollback();
        return res.status(500).json(Error.buildErrorRes("Internal Server Error"))
    }
}