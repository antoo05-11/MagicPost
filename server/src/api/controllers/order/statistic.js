import { Order } from "../../models/model-export"

export const getProfitStatistic = async (req, res) => {
    const orders = await Order.findAll();
    return res.status(200).json(orders);
}