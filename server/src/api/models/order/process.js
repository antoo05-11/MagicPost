module.exports = (sequelize, DataTypes) => {
    const Processes = sequelize.define("processes", {
        processID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        orderID: {
            type: DataTypes.STRING,
            references: {
                model: 'orders',
                key: 'orderID'
            },
            allowNull: false
        },
        currentRoutingPointID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'routing_points',
                key: 'routingPointID'
            },
        },
        nextRoutingPointID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'routing_points',
                key: 'routingPointID'
            }
        },
        arrivedTime: {
            type: DataTypes.DATE,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('arrived', 'on_way', 'return', 'arriving', 'forwarded', 'on_stock'),
            allowNull: false
        }
    }, {
        id: false
    });
    return Processes;
}
