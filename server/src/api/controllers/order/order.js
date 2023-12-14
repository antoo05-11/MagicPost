import path from 'path';
import { sequelize } from '../../models';
import Error from '../../exceptions/error';
import { checkDateFormat, normalizeDate } from '../../../utils';
const { QueryTypes } = require('sequelize');
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

Order.belongsTo(RoutingPoint, { foreignKey: 'startTransactionPointID', as: 'startTransactionPoint' });
Order.belongsTo(RoutingPoint, { foreignKey: 'endTransactionPointID', as: 'endTransactionPoint' });

Process.belongsTo(Order, { foreignKey: 'orderID' });
Process.belongsTo(RoutingPoint, { foreignKey: 'currentRoutingPointID', as: 'currentRoutingPoint' });
Process.belongsTo(RoutingPoint, { foreignKey: 'nextRoutingPointID', as: 'nextRoutingPoint' });

Address.belongsTo(Commune, { foreignKey: 'communeID' });
Commune.belongsTo(District, { foreignKey: 'districtID' });
District.belongsTo(Province, { foreignKey: 'provinceID' });
RoutingPoint.belongsTo(Address, { foreignKey: 'addressID' });
Order.hasMany(Process, { foreignKey: 'orderID' })

const fs = require('fs');
const limitRecordsNum = 8;

const getOrderByIDQueryPath = path.join(__dirname, '../../../queries/orders/order.select.sql');
let getOrderByIDQuery = ''
try {
    getOrderByIDQuery = fs.readFileSync(getOrderByIDQueryPath, 'utf8');
} catch (error) {
    console.error("Error reading file:", error);
}

const getOrderByIDForCustomerQueryPath = path.join(__dirname, '../../../queries/orders/orderForCustomer.select.sql');
let getOrderByIDForCustomerQuery = ''
try {
    getOrderByIDForCustomerQuery = fs.readFileSync(getOrderByIDForCustomerQueryPath, 'utf8');
} catch (error) {
    console.error("Error reading file:", error);
}

export const getOrdersByWorkingRouteID = async (req, res) => {
    const currentRoutingPointID = req.user.workingPointID;
    let page = req.query.page;
    if (page == undefined) page = 1;

    let maxCreatedAt = req.query.maxCreatedAt;
    let minCreatedAt = req.query.minCreatedAt;

    if (!checkDateFormat(maxCreatedAt) || !checkDateFormat(minCreatedAt))
        return res.status(400).json(Error.getError(Error.code.invalid_date_param_format));

    if (!minCreatedAt) minCreatedAt = normalizeDate('1/1/1970');
    if (!maxCreatedAt) maxCreatedAt = normalizeDate(new Date(Date.now()).toLocaleDateString());

    const orders = await Order.findAll({
        offset: ((page - 1) * limitRecordsNum),
        limit: limitRecordsNum,
        subQuery: false,
        where: {
            orderID: {
                [Op.in]: sequelize.literal(`
                (SELECT DISTINCT orderID
                FROM processes
                WHERE (currentRoutingPointID = ${currentRoutingPointID} 
                    OR nextRoutingPointID = ${currentRoutingPointID}))`)
            },
            createdAt: {
                [Op.between]: [
                    minCreatedAt, maxCreatedAt
                ]
            }
        },
        include: [
            {
                model: Process,
                order: [['processID', 'DESC']],
                limit: 1,
                include: [
                    {
                        model: RoutingPoint,
                        as: 'currentRoutingPoint',
                        include: {
                            model: Address,
                            include: [
                                {
                                    model: Commune,
                                    attributes: ['name']
                                },
                                {
                                    model: District,
                                    attributes: ['name']
                                },

                                {
                                    model: Province,
                                    attributes: ['name']
                                }
                            ],
                            attributes: { exclude: ['addressID', 'communeID', 'districtID', 'provinceID', 'type'] }
                        },
                        attributes: { exclude: ['routingPointID'] }
                    },
                    {
                        model: RoutingPoint,
                        as: 'nextRoutingPoint',
                        include: {
                            model: Address,
                            include: [
                                {
                                    model: Commune,
                                    attributes: ['name']
                                },
                                {
                                    model: District,
                                    attributes: ['name']
                                },

                                {
                                    model: Province,
                                    attributes: ['name']
                                }
                            ],
                            attributes: { exclude: ['addressID', 'communeID', 'districtID', 'provinceID', 'type'] }
                        },
                        attributes: { exclude: ['routingPointID'] }
                    }
                ]
            },
            {
                model: RoutingPoint,
                as: 'startTransactionPoint',
                include: {
                    model: Address,
                    include: [
                        {
                            model: Commune,
                            attributes: ['name']
                        },
                        {
                            model: District,
                            attributes: ['name']
                        },

                        {
                            model: Province,
                            attributes: ['name']
                        }
                    ],
                    attributes: { exclude: ['addressID', 'communeID', 'districtID', 'provinceID', 'type'] }
                },
                attributes: { exclude: ['routingPointID'] }
            },
            {
                model: RoutingPoint,
                as: 'endTransactionPoint',
                include: {
                    model: Address,
                    include: [
                        {
                            model: Commune,
                            attributes: ['name']
                        },
                        {
                            model: District,
                            attributes: ['name']
                        },

                        {
                            model: Province,
                            attributes: ['name']
                        }
                    ],
                    attributes: { exclude: ['addressID', 'communeID', 'districtID', 'provinceID', 'type'] }
                },
                attributes: { exclude: ['routingPointID'] }
            }
        ],
        attributes: ['orderID', 'sentTime', 'status', 'createdAt']
    })

    return res.status(200).json(orders);
}

export const getOrderByID = async (req, res) => {
    const orders = await sequelize.query(getOrderByIDQuery, {
        replacements: { orderID: req.params.id },
        type: QueryTypes.SELECT
    });
    const order = orders[0];
    const goodsList = await Goods.findAll({
        where: {
            orderID: order.orderID
        }
    })
    const result = {
        order: {
            sender: {
                fullname: order.senderFullName,
                phoneNumber: order.senderPhoneNumber,
                address: {
                    detail: order.senderAddressDetail,
                    commune: {
                        communeID: order.senderCommuneID,
                        name: order.senderCommuneName
                    },
                    district: {
                        districtID: order.senderDistrictID,
                        name: order.senderDistrictName
                    },
                    province: {
                        provinceID: order.senderProvinceID,
                        name: order.senderProvinceName
                    }

                }
            },
            receiver: {
                fullname: order.receiverFullName,
                phoneNumber: order.receiverPhoneNumber,
                address: {
                    detail: order.receiverAddressDetail,
                    commune: {
                        communeID: order.receiverCommuneID,
                        name: order.receiverCommuneName
                    },
                    district: {
                        districtID: order.receiverDistrictID,
                        name: order.receiverDistrictName
                    },
                    province: {
                        provinceID: order.receiverProvinceID,
                        name: order.receiverProvinceName
                    }
                }
            },
            creator: {
                creatorID: order.creatorID,
                creatorName: order.creatorName
            },
            failChoice: order.failChoice,
            mainPostage: order.mainPostage,
            addedPostage: order.addedPostage,
            VATFee: order.VATFee,
            otherFee: order.otherFee,
            receiverCOD: order.receiverCOD,
            receiverOtherFee: order.receiverOtherFee,
            specialService: order.specialService,
            orderID: order.orderID,
            startTransactionPointID: order.startTransactionPointID,
            endTransactionPointID: order.endTransactionPointID,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt
        },
        goodsList: goodsList
    };

    return res.status(200).json(result);
}

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
        await t.commit();

        savePoint.order.orderID = order.orderID;
        savePoint.order.startTransactionPointID = order.startTransactionPointID;
        savePoint.order.endTransactionPointID = order.endTransactionPointID;
        savePoint.order.creatorID = order.creatorID;
        savePoint.order.createdAt = order.createdAt;
        savePoint.order.updatedAt = order.updatedAt;

        return res.status(200).json(savePoint);
    } catch (error) {
        await t.rollback();
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
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
    const orders = await sequelize.query(getOrderByIDForCustomerQuery, {
        replacements: { orderID: req.params.id },
        type: QueryTypes.SELECT
    });
    if (orders.length == 0) return res.status(404).json(Error.getError(Error.code.invalid_order_id));
    const order = orders[0];
    const goodsList = await Goods.findAll({
        where: {
            orderID: order.orderID
        }
    })

    let processes = await Process.findAll({
        where: { orderID: order.orderID },
        order: [
            ['processID', 'ASC']
        ],
        attributes: { exclude: ['updatedAt', 'createdAt'] },
        include: [
            {
                model: RoutingPoint,
                as: 'currentRoutingPoint',
                include: {
                    model: Address,
                    include: [
                        {
                            model: Commune,
                            attributes: ['name']
                        },
                        {
                            model: District,
                            attributes: ['name']
                        },

                        {
                            model: Province,
                            attributes: ['name']
                        }
                    ],
                    attributes: { exclude: ['addressID', 'communeID', 'districtID', 'provinceID', 'type'] }
                },
                attributes: { exclude: ['routingPointID'] }
            },
            {
                model: RoutingPoint,
                as: 'nextRoutingPoint',
                include: {
                    model: Address,
                    include: [
                        {
                            model: Commune,
                            attributes: ['name']
                        },
                        {
                            model: District,
                            attributes: ['name']
                        },

                        {
                            model: Province,
                            attributes: ['name']
                        }
                    ],
                    attributes: { exclude: ['addressID', 'communeID', 'districtID', 'provinceID', 'type'] }
                },
                attributes: { exclude: ['routingPointID'] }
            }
        ]
    });

    const result = {
        order: {
            sender: {
                fullname: order.senderFullName,
                phoneNumber: order.senderPhoneNumber,
                address: {
                    detail: order.senderAddressDetail,
                    commune: {
                        name: order.senderCommuneName
                    },
                    district: {
                        name: order.senderDistrictName
                    },
                    province: {
                        name: order.senderProvinceName
                    }

                }
            },
            receiver: {
                fullname: order.receiverFullName,
                phoneNumber: order.receiverPhoneNumber,
                address: {
                    detail: order.receiverAddressDetail,
                    commune: {
                        name: order.receiverCommuneName
                    },
                    district: {
                        name: order.receiverDistrictName
                    },
                    province: {
                        name: order.receiverProvinceName
                    }
                }
            },
            orderID: order.orderID,
            startTransactionPoint: {
                startTransactionPointID: order.startTransactionPointID,
                address: {
                    detail: order.startTransactionAddressDetail,
                    commune: {
                        name: order.startTransactionCommuneName
                    },
                    district: {
                        name: order.startTransactionDistrictName
                    },
                    province: {
                        name: order.startTransactionProvinceName
                    }
                }
            },
            endTransactionPoint: {
                endTransactionPoint: order.endTransactionPointID,
                address: {
                    detail: order.endTransactionAddressDetail,
                    commune: {
                        name: order.endTransactionCommuneName
                    },
                    district: {
                        name: order.endTransactionDistrictName
                    },
                    province: {
                        name: order.endTransactionProvinceName
                    }
                }
            },
            goodsList: goodsList,
            processes: processes
        }
    };

    return res.status(200).json(result);
}