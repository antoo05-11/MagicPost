module.exports = (sequelize, DataTypes) => {
    const Processes = sequelize.define("processes", {
        processID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        orderID: {
            type: DataTypes.STRING,
            references: {
                model: 'orders',
                key: 'orderID'
            },
            allowNull: false
        },
        arrivedTime: {
            type: DataTypes.DATE,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('arriving', 'forwarded', 'on_stock'),
            allowNull: false
        },
        routingPointID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'routing_points',
                key: 'routingPointID'
            }
        }
    }, {
        id: false
    });
    return Processes;
}
