import path from 'path';
import { sequelize } from '../../models';
import Error from '../../exceptions/error';
import { checkDateFormat, normalizeDate } from '../../../utils';
import { buildAddressString } from '../routing_point/address';
const { Op } = require('sequelize')
const crypto = require('crypto');

const db = require('../../models');
const Order = db.orders;
const Goods = db.goods;
const Customer = db.customers;
const Address = db.addresses;
const Process = db.processes;
const RoutingPoint = db.routing_points;
const Commune = db.communes;
const District = db.districts;
const Province = db.provinces;
const TransactionPoint = db.transaction_points;
const GoodsPoint = db.goods_points;
const Employee = db.employees;

Order.belongsTo(TransactionPoint, { foreignKey: 'startTransactionPointID', as: 'startTransactionPoint' });
Order.belongsTo(TransactionPoint, { foreignKey: 'endTransactionPointID', as: 'endTransactionPoint' });
TransactionPoint.belongsTo(RoutingPoint, { foreignKey: 'transactionPointID' });

Process.belongsTo(Order, { foreignKey: 'orderID' });
Process.belongsTo(RoutingPoint, { foreignKey: 'routingPointID' });

Address.belongsTo(Commune, { foreignKey: 'communeID' });
Commune.belongsTo(District, { foreignKey: 'districtID' });
District.belongsTo(Province, { foreignKey: 'provinceID' });
RoutingPoint.belongsTo(Address, { foreignKey: 'addressID' });
Order.hasMany(Process, { foreignKey: 'orderID' });

Order.belongsTo(Customer, { foreignKey: 'senderID', as: 'sender' });
Order.belongsTo(Customer, { foreignKey: 'receiverID', as: 'receiver' });
Customer.belongsTo(Address, { foreignKey: 'addressID' });

Order.belongsTo(Employee, { foreignKey: 'creatorID' });

const fs = require('fs');
const limitRecordsNum = 8;

const getOrderByIDForCustomerQueryPath = path.join(__dirname, '../../../queries/orders/orderForCustomer.select.sql');
let getOrderByIDForCustomerQuery = ''
try {
    getOrderByIDForCustomerQuery = fs.readFileSync(getOrderByIDForCustomerQueryPath, 'utf8');
} catch (error) {
    console.error("Error reading file:", error);
}

/**
 * The function `getOrdersByWorkingRouteID` retrieves orders based on the working route ID of the user
 * and returns them with pagination and additional information.
 * @returns a JSON response with the following structure:
 * - totalPages: the total number of pages for the orders
 * - limit: the limit of orders per page
 * - orders: an array of objects containing the following information for each order.
 */
export const getOrdersByWorkingRouteID = async (req, res) => {
    const currentRoutingPointID = req.user.workingPointID;

    const page = req.query.page || 1;
    const limit = req.query.limit || limitRecordsNum;

    let maxCreatedAt = req.query.maxCreatedAt;
    let minCreatedAt = req.query.minCreatedAt;

    if (!checkDateFormat(maxCreatedAt) || !checkDateFormat(minCreatedAt))
        return res.status(400).json(Error.getError(Error.code.invalid_date_param_format));

    if (!minCreatedAt) minCreatedAt = normalizeDate('1/1/1970');
    if (!maxCreatedAt) maxCreatedAt = normalizeDate(new Date(Date.now()).toLocaleDateString());

    let totalPages = await Order.count({
        subQuery: false,
        where: {
            orderID: {
                [Op.in]: sequelize.literal(`
                (SELECT DISTINCT orderID
                FROM processes
                WHERE routingPointID = ${currentRoutingPointID})`)
            },
            createdAt: {
                [Op.between]: [
                    minCreatedAt, maxCreatedAt
                ]
            }
        }
    });
    totalPages = Math.ceil(totalPages / limit);
    if (totalPages == 0) return res.status(200).json([]);

    const orders = await Order.findAll({
        offset: ((page - 1) * limit),
        limit: limit,
        subQuery: false,
        where: {
            orderID: {
                [Op.in]: sequelize.literal(`
                (SELECT DISTINCT orderID
                    FROM processes
                    WHERE routingPointID = ${currentRoutingPointID})`)
            },
            createdAt: {
                [Op.between]: [minCreatedAt, maxCreatedAt]
            }
        },
        include: [
            {
                model: Process,
                order: [['processID', 'DESC']],
                limit: 1,
                attributes: ['status']
            },
            {
                model: TransactionPoint,
                as: 'startTransactionPoint',
                include: {
                    model: RoutingPoint,
                    include: {
                        model: Address,
                        include: { model: Province, attributes: ['name'] },
                        attributes: ['addressID']
                    },
                    attributes: ['routingPointID']
                },
                attributes: ['transactionPointID']
            },
            {
                model: TransactionPoint,
                as: 'endTransactionPoint',
                include: {
                    model: RoutingPoint,
                    include: {
                        model: Address,
                        include: { model: Province, attributes: ['name'] },
                        attributes: ['addressID']
                    },
                    attributes: ['routingPointID']
                },
                attributes: ['transactionPointID']
            }
        ],
        attributes: ['orderID', 'createdAt']
    })

    let resArray = [];
    for (const order of orders) {
        resArray.push({
            orderID: order.orderID,
            startTransactionProvince: order.startTransactionPoint.routing_point.address.province.name,
            endTransactionProvince: order.endTransactionPoint.routing_point.address.province.name,
            createdAt: order.createdAt,
            goodsStatus: order.processes[0].status
        })
    }
    return res.status(200).json({
        totalPages: totalPages,
        limit: limit,
        orders: resArray
    });
}

/**
 * The function `getOrderByID` retrieves an order and its associated data from the database and returns
 * it as a JSON response.
 * @returns a JSON response with the order details and the list of goods associated with the order.
 */
export const getOrderByID = async (req, res) => {
    const order = await Order.findOne({
        where: { orderID: req.params.id },
        include: [
            {
                model: Process,
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
            },
            {
                model: TransactionPoint,
                as: 'startTransactionPoint',
                include: {
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
                attributes: ['name', 'zipCode']
            },
            {
                model: TransactionPoint,
                as: 'endTransactionPoint',
                include: {
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
                attributes: ['name', 'zipCode']
            },
            {
                model: Customer,
                as: 'sender',
                include: {
                    model: Address,
                    attributes: ['detail'],
                    include: [
                        { model: Commune, attributes: ['name'] },
                        { model: District, attributes: ['name'] },
                        { model: Province, attributes: ['name'] }
                    ]
                },
                attributes: ['fullname', 'customerID', 'phoneNumber']
            },
            {
                model: Customer,
                as: 'receiver',
                include: {
                    model: Address,
                    attributes: ['detail'],
                    include: [
                        { model: Commune, attributes: ['name'] },
                        { model: District, attributes: ['name'] },
                        { model: Province, attributes: ['name'] }
                    ]
                },
                attributes: ['fullname', 'customerID', 'phoneNumber']
            },
            {
                model: Employee,
                attributes: ['employeeID', 'fullName']
            }
        ]
    })

    const goodsList = await Goods.findAll({
        where: { orderID: order.orderID }
    })

    let goodsStatus = undefined;

    const processes = []
    for (let process of order.processes) {
        process = { ...process.get() }

        if (!goodsStatus && process.routingPointID === req.user.workingPointID) {
            goodsStatus = process.status;
        }

        process = {
            processID: process.processID,
            routingPointAddress: buildAddressString(process.routing_point.address),
            status: process.status,
            arrivedTime: process.arrivedTime
        }
        processes.push(process);
    }

    if (!goodsStatus) {
        return res.status(400).json(Error.getError(Error.code.not_authorized));
    }

    const result = {
        order: {
            orderID: order.orderID,
            sender: {
                fullName: order.sender.fullname,
                phoneNumber: order.sender.phoneNumber,
                address: buildAddressString(order.sender.address),
                customerID: order.sender.customerID
            },
            receiver: {
                fullName: order.receiver.fullname,
                phoneNumber: order.receiver.phoneNumber,
                address: buildAddressString(order.receiver.address),
                customerID: order.receiver.customerID
            },
            creator: order.employee,
            failChoice: order.failChoice,
            mainPostage: order.mainPostage,
            addedPostage: order.addedPostage,
            VATFee: order.VATFee,
            otherFee: order.otherFee,
            receiverCOD: order.receiverCOD,
            receiverOtherFee: order.receiverOtherFee,
            specialService: order.specialService,
            status: order.status,
            goodsStatus: goodsStatus,
            sentTime: order.sentTime,
            receivedTime: order.receivedTime,
            startTransactionPoint: {
                name: order.startTransactionPoint.name,
                address: buildAddressString(order.startTransactionPoint.routing_point.address),
                zipCode: order.startTransactionPoint.zipCode
            },
            endTransactionPoint: {
                name: order.endTransactionPoint.name,
                address: buildAddressString(order.endTransactionPoint.routing_point.address),
                zipCode: order.endTransactionPoint.zipCode
            },
            createdAt: order.createdAt,
            processes: processes
        },
        goodsList: goodsList
    };

    return res.status(200).json(result);
}

/**
 * The `createOrder` function creates a new order in a database, along with associated sender,
 * receiver, and goods information, and returns the saved order data.
 * @returns a response with status code 200 and the `savePoint` object as JSON data.
 */
export const createOrder = async (req, res) => {
    let order = JSON.parse(JSON.stringify(req.body.order));
    let savePoint = JSON.parse(JSON.stringify(req.body));

    let goodsList = req.body.goodsList;

    order.orderID = generateOrderID();
    order.creatorID = req.user.employeeID;

    order.startTransactionPointID = req.user.workingPointID;
    order.endTransactionPointID = "46"

    const t = await sequelize.transaction();
    try {
        let senderAddress = await Address.create(req.body.order.sender.address, { transaction: t });
        let receiverAddress = await Address.create(req.body.order.receiver.address, { transaction: t });

        let sender = req.body.order.sender;
        let receiver = req.body.order.receiver;
        sender.addressID = senderAddress.dataValues.addressID;
        receiver.addressID = receiverAddress.dataValues.addressID;

        delete sender.address;
        delete receiver.address;

        sender = await Customer.create(sender, { transaction: t });
        receiver = await Customer.create(receiver, { transaction: t });

        order.senderID = sender.dataValues.customerID;
        order.receiverID = receiver.dataValues.customerID;

        delete order.sender;
        delete order.receiver;

        order = await Order.create(order, { transaction: t });
        for (const goods of goodsList) {
            let clone = JSON.parse(JSON.stringify(goods));
            clone.orderID = order.dataValues.orderID;
            await Goods.create(clone, { transaction: t });
        }

        await Process.create({
            orderID: order.orderID,
            routingPointID: order.startTransactionPointID,
            status: 'on_stock',
            arrivedTime: Date.now()
        }, { transaction: t })

        await t.commit();
    } catch (error) {
        await t.rollback();
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    req.params.id = order.orderID;
    await getOrderByID(req, res);
}

function generateOrderID() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomIndexes = crypto.randomBytes(3);
    let orderID = alphabet[randomIndexes[0] % 26]
        + alphabet[randomIndexes[1] % 26]
        + alphabet[randomIndexes[2] % 26];
    orderID += crypto.randomInt(100000000, 999999999).toString() + "VN";
    return orderID;
}

export const getOrderByIDForCustomer = async (req, res) => {
    const order = await Order.findOne({
        where: { orderID: req.params.id },
        include: [
            {
                model: Process,
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
            },
            {
                model: TransactionPoint,
                as: 'startTransactionPoint',
                include: {
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
                attributes: ['name', 'zipCode']
            },
            {
                model: TransactionPoint,
                as: 'endTransactionPoint',
                include: {
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
                attributes: ['name', 'zipCode']
            },
            {
                model: Customer,
                as: 'sender',
                include: {
                    model: Address,
                    attributes: ['detail'],
                    include: [
                        { model: Commune, attributes: ['name'] },
                        { model: District, attributes: ['name'] },
                        { model: Province, attributes: ['name'] }
                    ]
                },
                attributes: ['fullname', 'customerID', 'phoneNumber']
            },
            {
                model: Customer,
                as: 'receiver',
                include: {
                    model: Address,
                    attributes: ['detail'],
                    include: [
                        { model: Commune, attributes: ['name'] },
                        { model: District, attributes: ['name'] },
                        { model: Province, attributes: ['name'] }
                    ]
                },
                attributes: ['fullname', 'customerID', 'phoneNumber']
            },
            {
                model: Employee,
                attributes: ['employeeID', 'fullName']
            }
        ]
    })

    const goodsList = await Goods.findAll({
        where: { orderID: order.orderID },
        attributes: ['realWeight']
    })

    let weight = 0;
    for (const goods of goodsList) weight += goods.realWeight;

    const processes = []
    for (let process of order.processes) {
        process = { ...process.get() }
        process = {
            processID: process.processID,
            routingPointAddress: buildAddressString(process.routing_point.address),
            status: process.status,
            arrivedTime: process.arrivedTime
        }
        processes.push(process);
    }

    const result = {
        order: {
            orderID: order.orderID,
            sender: {
                fullName: order.sender.fullname,
                address: buildAddressString(order.sender.address, false),
            },
            receiver: {
                fullName: order.receiver.fullname,
                address: buildAddressString(order.receiver.address, false),
            },
            creator: order.employee,
            status: order.status,
            sentTime: order.sentTime,
            receivedTime: order.receivedTime,
            weight: weight,
            estimatedDeliveryDate: order.sentTime,
            createdAt: order.createdAt,
            processes: processes
        }
    };

    return res.status(200).json(result);
}