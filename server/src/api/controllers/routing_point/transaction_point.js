import Error from '../../exceptions/error';
import { Commune, District, Province, buildAddressWhereClause } from './address';

const db = require('../../models');

const TransactionPoint = db.transaction_points;
const Address = db.addresses;
const Order = db.orders;
const RoutingPoint = db.routing_points;
const Process = db.processes;

Process.belongsTo(TransactionPoint, { foreignKey: 'currentRoutingPointID', as: 'currentTransactionPoint' });
Process.belongsTo(TransactionPoint, { foreignKey: 'nextRoutingPointID', as: 'nextTransactionPoint' });

export const getAllTransactionPoints = async (req, res) => {
    // let transactionPoints = await TransactionPoint.findAll({
    //     attributes: ['transactionPointID', 'addressID'],
    //     include: [{
    //         model: Address,
    //         required: true,
    //         attributes: ['detail'],
    //         include: [{
    //             model: Commune,
    //             required: true,
    //             attributes: ['name']
    //         }, {
    //             model: District,
    //             required: true,
    //             attributes: ['name']
    //         }, {
    //             model: Province,
    //             required: true,
    //             attributes: ['name']
    //         }]
    //     }]
    // });

    const processes = Process.findAll({
        include: [
            {
                model: TransactionPoint,
                as: 'currentTransactionPoint',
                required: true
            },
            {
                model: TransactionPoint,
                as: 'currentTransactionPoint',
                required: true
            }
        ]
    })
    return res.status(200).json(processes);
};


/**
 * The function retrieves transaction points by address for a customer.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made by the client. It includes details such as the request method, headers, query
 * parameters, and body.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It is typically an instance of the `Response` object.
 * @returns a response with a status code of 200 and a JSON object containing the transactions.
 */
export const getTransactionPointsByAddressForCustomer = async (req, res) => {
    let addressWhereClause = buildAddressWhereClause(req.query);

    const transactions = await TransactionPoint.findAll({
        attributes: [],
        include: [{
            model: Address,
            required: true,
            attributes: ['detail'],
            where: addressWhereClause,
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

    return res.status(200).json(transactions);
}
