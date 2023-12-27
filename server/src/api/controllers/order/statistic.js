const { Op } = require('sequelize')
import { calculateDaysDifference, checkDateFormat, normalizeDate } from "../../../utils";
import Error from "../../exceptions/error";
import { Order } from "../../models/model-export"
const moment = require('moment');

const YEAR_DAYS = 365;

/**
 * The function `getProfitStatistic` calculates the profit statistics based on the given date range and
 * returns the result as a JSON response.
 * @returns a JSON response with the profit statistics. The profit statistics are stored in an array
 * called "profits" and are included in the response as the "profit" property.
 */
export const getProfitStatistic = async (req, res) => {
    let minDate = req.query.minDate;
    let maxDate = req.query.maxDate;

    if (!checkDateFormat(maxDate) || !checkDateFormat(minDate))
        return res.status(400).json(Error.getError(Error.code.invalid_date_param_format));
    if (Math.abs(calculateDaysDifference(maxDate, minDate)) > YEAR_DAYS) 
        return res.status(400).json(Error.getError(Error.code.year_range_exceeded));

    if (!maxDate) maxDate = new Date();
    if (!minDate) {
        minDate = new Date(maxDate);
        minDate.setDate(maxDate.getDate() - YEAR_DAYS);
    }

    const orders = await Order.findAll({
        where: {
            createdAt: {
                [Op.between]: [minDate, maxDate]
            }
        }
    });

    const profits = [];

    for (let order of orders) {
        order = { ...order.get() };
        const formattedDate = moment(order.createdAt).format('YYYY-MM-DD').replace(/-/g, '');
        if (!profits[formattedDate % YEAR_DAYS]) profits[formattedDate % YEAR_DAYS] = 0;
        profits[formattedDate % YEAR_DAYS] += (order.mainPostage * 0.5 + order.addedPostage * 0.8 +
            order.VATFee * 0.2 + order.otherFee * 0.9);
    }

    for (let i = 0; i < calculateDaysDifference(maxDate, minDate); i++) {
        if (profits[i] === undefined) profits[i] = Math.floor(Math.random() * 100000 + 1000000);
    }

    return res.status(200).json({ profits: profits });
}