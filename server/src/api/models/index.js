import { DataTypes, Sequelize } from "sequelize";
const dbconfig = require('../config/dbconfig.js');
const sequelize = new Sequelize(
    dbconfig.DATABASE,
    dbconfig.USER,
    dbconfig.PASSWORD,
    {
        host: dbconfig.HOST,
        dialect: dbconfig.dialeg,
        operatorsAliases: false,
        pool: {
            max: dbconfig.pool.max,
            min: dbconfig.pool.min,
            acquire: dbconfig.pool.acquire,
            idle: dbconfig.pool.idle
        }
    }
)
sequelize.authenticate().then(() => {
    console.log("Connected to Database server.");
}).catch(e => { console.log(e); })

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.provinces = require('./administrative/province.js')(sequelize, DataTypes);
db.districts = require('./administrative/district.js')(sequelize, DataTypes);
db.communes = require('./administrative/commune.js')(sequelize, DataTypes);

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('Re-sync are done!')
    })
module.exports = db;