const { Router } = require("express");
const { default: catchAsync } = require("../../exceptions/catch-async");
const { getAllGoodsPoint } = require("../../controllers/routing_point/goods_point");

const goodsPointRoute = new Router;

goodsPointRoute.get("/getAll", catchAsync(getAllGoodsPoint));

export default goodsPointRoute;