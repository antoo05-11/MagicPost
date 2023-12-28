import { sequelize } from '../../models';
import Error from '../../exceptions/error';
import { checkDateFormat, normalizeDate } from '../../../utils';
import { buildAddressString, buildAddressWhereClause, findDistance } from '../routing_point/address';
import { Address, Commune, Customer, District, Employee, Goods, Order, Process, Province, RoutingPoint, TransactionPoint } from '../../models/model-export';
import { findNearestTransactionPoint } from '../routing_point/transaction_point';

const { Op } = require('sequelize')
const crypto = require('crypto');
const fs = require('fs');

const limitRecordsNum = 8;

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

    const orderID = req.query.orderID || '';
    const startAddress = req.query.startAddress || '';
    const endAddress = req.query.endAddress || '';
    const goodsStatus = req.query.goodsStatus || '';

    const startAddressWhereClause = buildAddressWhereClause(startAddress);
    const endAddressWhereClause = buildAddressWhereClause(endAddress);

    const page = req.query.page || 1;
    const limit = parseInt(req.query.limit) || limitRecordsNum;

    let maxCreatedAt = req.query.maxCreatedAt;
    let minCreatedAt = req.query.minCreatedAt;

    if (!checkDateFormat(maxCreatedAt) || !checkDateFormat(minCreatedAt))
        return res.status(400).json(Error.getError(Error.code.invalid_date_param_format));

    if (!minCreatedAt) minCreatedAt = normalizeDate('1/1/1970');
    if (!maxCreatedAt) maxCreatedAt = Date.now();

    let processes = await Process.count({
        where: {
            routingPointID: currentRoutingPointID,
            status: { [Op.like]: `%${goodsStatus}%` }
        },
        include: {
            model: Order,
            attributes: ['orderID'],
            where: {
                createdAt: {
                    [Op.between]: [minCreatedAt, maxCreatedAt]
                }
            },
            include: [
                {
                    model: TransactionPoint,
                    as: 'startTransactionPoint',
                    include: {
                        model: RoutingPoint,
                        include: {
                            model: Address,
                            include: { model: Province, attributes: ['name'] },
                            attributes: ['addressID'],
                            where: startAddressWhereClause,
                            required: true,
                        },
                        required: true,
                        attributes: ['routingPointID']
                    },
                    required: true,
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
                            attributes: ['addressID'],
                            where: endAddressWhereClause,
                            required: true,
                        },
                        attributes: ['routingPointID'],
                        required: true,
                    },
                    attributes: ['transactionPointID'],
                    required: true
                }
            ]
        }
    });
    const totalPages = Math.ceil(processes / limit);

    processes = await Process.findAll({
        limit: limit,
        offset: limit * (page - 1),
        where: {
            routingPointID: currentRoutingPointID,
            status: { [Op.like]: `%${goodsStatus}%` }
        },
        include: {
            model: Order,
            attributes: ['orderID', 'createdAt'],
            where: {
                createdAt: {
                    [Op.between]: [minCreatedAt, maxCreatedAt]
                }
            },
            include: [
                {
                    model: TransactionPoint,
                    as: 'startTransactionPoint',
                    include: {
                        model: RoutingPoint,
                        include: {
                            model: Address,
                            include: { model: Province, attributes: ['name'] },
                            attributes: ['addressID'],
                            where: startAddressWhereClause,
                            required: true,
                        },
                        required: true,
                        attributes: ['routingPointID']
                    },
                    required: true,
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
                            attributes: ['addressID'],
                            where: endAddressWhereClause,
                            required: true,
                        },
                        attributes: ['routingPointID'],
                        required: true,
                    },
                    attributes: ['transactionPointID'],
                    required: true
                }
            ]
        }
    });

    const orders = []
    for (const process of processes) {
        const order = process.order;
        orders.push({
            orderID: order.orderID,
            startTransactionProvince: order.startTransactionPoint.routing_point.address.province.name,
            endTransactionProvince: order.endTransactionPoint.routing_point.address.province.name,
            createdAt: order.createdAt,
            goodsStatus: process.status
        })
    }

    return res.status(200).json({
        totalPages: totalPages,
        limit: limit,
        orders: orders
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

    let postage = await getOrderCost(req);

    if ((order.mainPostage && postage.mainPostage != order.mainPostage) ||
        (order.addedPostage && postage.addedPostage != order.addedPostage) ||
        (order.VATFee && postage.VATFee != order.VATFee) ||
        (order.otherFee && postage.otherFee != order.otherFee))
        return res.status(400).json(Error.getError(Error.code.invalid_postage))

    order.mainPostage = postage.mainPostage;
    order.addedPostage = postage.addedPostage;
    order.VATFee = postage.VATFee;
    order.otherFee = postage.otherFee;

    let goodsList = req.body.goodsList;

    order.orderID = generateOrderID();
    order.creatorID = req.user.employeeID;

    order.startTransactionPointID = req.user.workingPointID;

    order.endTransactionPointID = await findNearestTransactionPoint(req.body.order.receiver.address, res);
    if (!order.endTransactionPointID) return res.status(400).json(Error.getError(Error.code.unsupported_region));

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
        for (let goods of goodsList) {
            goods = JSON.parse(JSON.stringify(goods));
            goods.orderID = order.dataValues.orderID;
            await Goods.create(goods, { transaction: t });
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

/**
 * The function generates a unique order ID consisting of three random letters from the alphabet and a
 * random 9-digit number followed by "VN".
 * @returns a randomly generated order ID.
 */
function generateOrderID() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomIndexes = crypto.randomBytes(3);
    let orderID = alphabet[randomIndexes[0] % 26]
        + alphabet[randomIndexes[1] % 26]
        + alphabet[randomIndexes[2] % 26];
    orderID += crypto.randomInt(100000000, 999999999).toString() + "VN";
    return orderID;
}

/**
 * The function `getOrderByIDForCustomer` retrieves an order and its associated data from the database
 * and returns it as a JSON response.
 * @returns a JSON response with the order details, including the order ID, sender and receiver
 * information, creator, status, sent and received times, weight, estimated delivery date, creation
 * date, and a list of processes associated with the order.
 */
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
                provinceName: order.sender.address.province.name,
            },
            receiver: {
                fullName: order.receiver.fullname,
                provinceName: order.receiver.address.province.name,
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

/**
 * The function calculates the cost of an order based on various factors such as the sender and
 * receiver's province, the weight of the goods, and additional fees.
 * @returns an object with the following properties: mainPostage, addedPostage, VATFee, otherFee,
 * receiverCOD, and receiverOtherFee.
 */
export const getOrderCost = async (req, res) => {
    const order = JSON.parse(JSON.stringify(req.body.order));
    const result = {
        mainPostage: 0,
        addedPostage: 0,
        VATFee: 0,
        otherFee: 0
    };

    if (order.sender.provinceID != order.receiver.provinceID) {
        result.mainPostage = 15000;
    } else result.mainPostage = 10000;

    let sumRealWeight = 0;
    let sumConvertedWeight = 0;

    for (const goods of JSON.parse(JSON.stringify(req.body.goodsList))) {
        sumRealWeight += goods.realWeight;
        sumConvertedWeight += goods.convertedWeight;
    }

    result.addedPostage = (0.3 * sumRealWeight + 0.7 * sumConvertedWeight) * 1000;

    if (sumConvertedWeight > 10.0) result.otherFee = 10000;

    result.VATFee = 0.08 * (result.mainPostage + result.addedPostage);

    if (res) return res.status(200).json(result);
    return result;
}
