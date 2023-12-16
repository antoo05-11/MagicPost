import Error from '../../exceptions/error';
import { Commune, District, Province, buildAddressString, buildAddressWhereClause } from './address';
import { sequelize } from '../../models';

const db = require('../../models');

const TransactionPoint = db.transaction_points;
const Address = db.addresses;
const Order = db.orders;
const RoutingPoint = db.routing_points;
const Process = db.processes;

TransactionPoint.belongsTo(RoutingPoint, { foreignKey: 'transactionPointID' });
RoutingPoint.belongsTo(Address, { foreignKey: 'addressID' });

Address.belongsTo(Commune, { foreignKey: 'communeID' });
Commune.belongsTo(District, { foreignKey: 'districtID' });
District.belongsTo(Province, { foreignKey: 'provinceID' });
RoutingPoint.belongsTo(Address, { foreignKey: 'addressID' });
Order.hasMany(Process, { foreignKey: 'orderID' });

Process.belongsTo(TransactionPoint, { foreignKey: 'routingPointID' });
TransactionPoint.hasMany(Process, { foreignKey: 'routingPointID' });

export const getAllTransactionPoints = async (req, res) => {

    await TransactionPoint.hasMany(Order, { foreignKey: 'startTransactionPointID' });
    const startTransactionPoints = await TransactionPoint.findAll({
        attributes: ['transactionPointID', [sequelize.fn('COUNT', sequelize.col('orders.orderID')), 'orderCount']],
        include: [{
            model: Order, required: false,
            attributes: [],
            foreignKey: 'startTransactionPointID'
        }],
        group: ['transaction_points.transactionPointID']
    });

    await TransactionPoint.hasMany(Order, { foreignKey: 'endTransactionPointID' });
    const endTransactionPoints = await TransactionPoint.findAll({
        attributes: ['transactionPointID', 'name', 'zipCode', [sequelize.fn('COUNT', sequelize.col('orders.orderID')), 'orderCount']],
        include: [
            {
                model: Order, required: false,
                attributes: [],
                foreignKey: 'endTransactionPointID'
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
        ],
        group: ['transaction_points.transactionPointID']
    });

    const map = new Map();

    let result = [];

    for (let transactionPoint of startTransactionPoints) {
        transactionPoint = { ...transactionPoint.get() };
        map.set(transactionPoint.transactionPointID, transactionPoint.orderCount);
    }

    for (let transactionPoint of endTransactionPoints) {
        transactionPoint = { ...transactionPoint.get() };

        transactionPoint.address = buildAddressString(transactionPoint.routing_point.address);
        delete transactionPoint.routing_point;

        transactionPoint.endOrders = transactionPoint.orderCount;
        delete transactionPoint.orderCount;

        transactionPoint.startOrders = map.get(transactionPoint.transactionPointID);
        result.push(transactionPoint)
    }

    return res.status(200).json(result);
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
        include: {
            model: RoutingPoint,
            include: {
                model: Address,
                where: addressWhereClause,
                attributes: ['detail'],
                include: [
                    { model: Commune, attributes: ['name'] },
                    { model: District, attributes: ['name'] },
                    { model: Province, attributes: ['name'] }
                ]
            },
            attributes: ['routingPointID'],
            required: true
        }
    });

    const result = []
    for (let transaction of transactions) {
        transaction = { ...transaction.get() };
        transaction.address = buildAddressString(transaction.routing_point.address);
        delete transaction.routing_point;
        result.push(transaction);
    }

    return res.status(200).json(result);
}