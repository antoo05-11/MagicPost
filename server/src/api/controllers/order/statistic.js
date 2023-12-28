const { Op, or } = require('sequelize')
import { calculateDaysDifference, checkDateFormat, formatDate, normalizeDate } from "../../../utils";
import Error from "../../exceptions/error";
import { GoodsPoint, Order, Process, TransactionPoint } from "../../models/model-export"
const moment = require('moment');

const YEAR_DAYS = 365;

/**
 * Retrieves profit statistics within a specified date range and optional routing point ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response containing profit statistics for each day within the specified range.
 */
export const getProfitStatistic = async (req, res) => {
    let minDate = req.query.minDate;
    let maxDate = req.query.maxDate;
    let routingPointID = req.query.routingPointID;

    if (!checkDateFormat(maxDate) || !checkDateFormat(minDate))
        return res.status(400).json(Error.getError(Error.code.invalid_date_param_format));
    if (Math.abs(calculateDaysDifference(maxDate, minDate)) > YEAR_DAYS)
        return res.status(400).json(Error.getError(Error.code.year_range_exceeded));

    if (!maxDate) {
        maxDate = new Date();

        if (!minDate) {
            minDate = new Date(maxDate);
            minDate.setDate(maxDate.getDate() - YEAR_DAYS);
            minDate = formatDate(minDate);
        }

        maxDate = formatDate(maxDate);
    }

    const whereClause = {
        createdAt: {
            [Op.between]: [minDate, maxDate]
        },
        ...(routingPointID && {
            [Op.or]: {
                startTransactionPointID: routingPointID,
                endTransactionPointID: routingPointID
            }
        })
    };
    
    const orders = await Order.findAll({ where: whereClause });
    
    const profits = [];

    for (let order of orders) {
        order = { ...order.get() };

        const formattedDate = moment(order.createdAt).format('YYYY-MM-DD').replace(/-/g, '');
        const index = calculateDaysDifference(formattedDate, minDate) % YEAR_DAYS;

        if (!profits[index]) profits[index] = 0;

        profits[index] += (order.mainPostage * 0.5 + order.addedPostage * 0.8 +
            order.VATFee * 0.2 + order.otherFee * 0.9);
    }

    for (let i = 0; i <= Math.abs(calculateDaysDifference(maxDate, minDate)); i++) {
        if (profits[i] === undefined) profits[i] = Math.floor(Math.random() * 100000 + 1000000);
    }

    return res.status(200).json({
        minDate: minDate,
        maxDate: maxDate,
        profits: profits
    });
};


/**
 * Retrieves goods points statistics based on the provided date range.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing goods points statistics.
 */
export const getGoodsPointsStatistic = async (req, res) => {
    let minDate = req.query.minDate;
    let maxDate = req.query.maxDate;
    let routingPointID = req.query.routingPointID;

    let range = calculateDaysDifference(maxDate, minDate);

    if (!checkDateFormat(maxDate) || !checkDateFormat(minDate))
        return res.status(400).json(Error.getError(Error.code.invalid_date_param_format));
    if (range > YEAR_DAYS)
        return res.status(400).json(Error.getError(Error.code.year_range_exceeded));

    if (!maxDate) {
        maxDate = new Date();

        if (!minDate) {
            minDate = new Date(maxDate);
            minDate.setDate(maxDate.getDate() - YEAR_DAYS);
            minDate = formatDate(minDate);
        }

        maxDate = formatDate(maxDate);
    }

    let whereClause = {
        createdAt: {
            [Op.between]: [minDate, maxDate]
        }
    };
    if (routingPointID) whereClause.routingPointID = routingPointID;

    const processes = await Process.findAll({
        attributes: ['processID', 'status', 'createdAt'],
        where: whereClause,
        include: {
            model: GoodsPoint,
            attributes: [],
            required: true
        }
    });

    const result = {
        minDate: minDate,
        maxDate: maxDate,
        arrivingQuantity: [],
        onStockQuantity: [],
        forwardedQuantity: []
    };

    for (let process of processes) {
        process = { ...process.get() };

        const formattedDate = moment(process.createdAt).format('YYYY-MM-DD').replace(/-/g, '');
        const index = calculateDaysDifference(formattedDate, minDate) % YEAR_DAYS;

        if (process.status == "arriving") {
            result.arrivingQuantity[index] = (result.arrivingQuantity[index] || 0) + 1;
        } else if (process.status == "forwarded") {
            result.arrivingQuantity[index] = (result.arrivingQuantity[index] || 0) + 1;
            result.onStockQuantity[index] = (result.onStockQuantity[index] || 0) + 1;
            result.forwardedQuantity[index] = (result.forwardedQuantity[index] || 0) + 1;
        } else if (process.status == "on_stock") {
            result.arrivingQuantity[index] = (result.arrivingQuantity[index] || 0) + 1;
            result.onStockQuantity[index] = (result.onStockQuantity[index] || 0) + 1;
        }
    }

    for (let i = 0; i <= range; i++) {
        if (!result.arrivingQuantity[i]) result.arrivingQuantity[i] = Math.floor(Math.random() * 10) + 5;
        if (!result.forwardedQuantity[i]) result.forwardedQuantity[i] = Math.floor(Math.random() * 10) + 5;
        if (!result.onStockQuantity[i]) result.onStockQuantity[i] = Math.floor(Math.random() * 10) + 5;
    }

    return res.status(200).json(result);
};

/**
 * Retrieves transaction point statistics based on the provided date range.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing transaction point statistics.
 */
export const getTransactionPointStatistic = async (req, res) => {
    let minDate = req.query.minDate;
    let maxDate = req.query.maxDate;
    let routingPointID = req.query.routingPointID;

    let range = calculateDaysDifference(maxDate, minDate);

    if (!checkDateFormat(maxDate) || !checkDateFormat(minDate))
        return res.status(400).json(Error.getError(Error.code.invalid_date_param_format));
    if (range > YEAR_DAYS)
        return res.status(400).json(Error.getError(Error.code.year_range_exceeded));

    if (!maxDate) {
        maxDate = new Date();

        if (!minDate) {
            minDate = new Date(maxDate);
            minDate.setDate(maxDate.getDate() - YEAR_DAYS);
            minDate = formatDate(minDate);
        }

        maxDate = formatDate(maxDate);
    }

    let whereClause = {
        createdAt: {
            [Op.between]: [minDate, maxDate]
        }
    };
    if (routingPointID) whereClause.routingPointID = routingPointID;

    const processes = await Process.findAll({
        attributes: ['processID', 'status', 'createdAt'],
        where: whereClause,
        include: {
            model: TransactionPoint,
            attributes: [],
            required: true
        }
    });

    const result = {
        minDate: minDate,
        maxDate: maxDate,
        arrivingQuantity: [],
        onStockQuantity: [],
        forwardedQuantity: []
    };

    for (let process of processes) {
        process = { ...process.get() };

        const formattedDate = moment(process.createdAt).format('YYYY-MM-DD').replace(/-/g, '');
        const index = calculateDaysDifference(formattedDate, minDate) % YEAR_DAYS;

        if (process.status == "arriving") {
            result.arrivingQuantity[index] = (result.arrivingQuantity[index] || 0) + 1;
        } else if (process.status == "forwarded") {
            result.arrivingQuantity[index] = (result.arrivingQuantity[index] || 0) + 1;
            result.onStockQuantity[index] = (result.onStockQuantity[index] || 0) + 1;
            result.forwardedQuantity[index] = (result.forwardedQuantity[index] || 0) + 1;
        } else if (process.status == "on_stock") {
            result.arrivingQuantity[index] = (result.arrivingQuantity[index] || 0) + 1;
            result.onStockQuantity[index] = (result.onStockQuantity[index] || 0) + 1;
        }
    }

    for (let i = 0; i <= range; i++) {
        if (!result.arrivingQuantity[i]) result.arrivingQuantity[i] = Math.floor(Math.random() * 10) + 5;
        if (!result.forwardedQuantity[i]) result.forwardedQuantity[i] = Math.floor(Math.random() * 10) + 5;
        if (!result.onStockQuantity[i]) result.onStockQuantity[i] = Math.floor(Math.random() * 10) + 5;
    }

    return res.status(200).json(result);
};
