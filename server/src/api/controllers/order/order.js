const db = require('../../models');
const Order = db.orders;

export const getAllOrders = async (req, res) => {
    const orders = await Order.findAll();
    return res.status(200).json(orders)
}

export const createOrder = async (req, res) => {
    
}