import { buildAddressString, buildAddressWhereClause } from './address';
import { sequelize } from '../../models';
import { role } from '../../models/human/role';
import { Address, Commune, District, Employee, Order, Process, Province, RoutingPoint, TransactionPoint } from '../../models/model-export';

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
        attributes: ['transactionPointID', 'name', [sequelize.fn('COUNT', sequelize.col('orders.orderID')), 'orderCount']],
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
            },
            {
                model: Employee,
                where: { role: role.TRANSACTION_POINT_HEAD },
                attributes: ['fullName', 'employeeID'],
                required: false
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

        transactionPoint.address = transactionPoint.routing_point.address;
        delete transactionPoint.routing_point;

        transactionPoint.startOrders = map.get(transactionPoint.transactionPointID);

        transactionPoint.endOrders = transactionPoint.orderCount;
        delete transactionPoint.orderCount;

        if (transactionPoint.employees.length > 0) {
            transactionPoint.head = transactionPoint.employees[0];
        }
        delete transactionPoint.employees;

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