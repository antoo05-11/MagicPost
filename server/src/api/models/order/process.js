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
        currentRoutingPoint: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'routing_points',
                key: 'routingPointID'
            },
        },
        nextRoutingPoint: {
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
            type: DataTypes.ENUM('arrived', 'on_way', 'return'),
            allowNull: false
        }
    }, {
        id: false,
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });
    return Processes;
}
