import { DataTypes, Sequelize } from "sequelize";
require('dotenv').config()

const sequelize = new Sequelize(
    process.env.DB_URI, {}
)

sequelize
    .authenticate()
    .then(() => {
        console.log("Connected to Database server.");
    })
    .catch((e) => {
        console.log(e);
    });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.provinces = require("./administrative/province.js")(sequelize, DataTypes);
db.districts = require("./administrative/district.js")(sequelize, DataTypes);
db.communes = require("./administrative/commune.js")(sequelize, DataTypes);
db.addresses = require("./routing_point/address.js")(sequelize, DataTypes);
db.routes = require("./routing_point/route.js")(sequelize, DataTypes);
db.employees = require("./human/employee.js")(sequelize, DataTypes);
db.customers = require("./human/customer.js")(sequelize, DataTypes);
db.goods_points = require("./routing_point/goods_point.js")(
    sequelize,
    DataTypes
);
db.transaction_points = require("./routing_point/transaction_point.js")(
    sequelize,
    DataTypes
);
db.orders = require("./order/order.js")(sequelize, DataTypes);
db.processes = require("./order/process.js")(sequelize, DataTypes);
db.goods = require("./order/goods.js")(sequelize, DataTypes);
db.employee_roles = require("./human/employeeRole.js")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
    console.log("Re-sync are done!");
});
module.exports = db;
