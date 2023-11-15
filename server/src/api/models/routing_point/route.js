module.exports = (sequelize, DataTypes) => {

    const Route = sequelize.define("route", {
        originID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'RoutingPoint',
                key: 'routingPointID'
            }
        },
        destinationID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'RoutingPoint',
                key: 'routingPointID'
            }
        },
        distanceValue: {
            type: DataTypes.DOUBLE
        }
    }, {
        id: false,
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    })

    return Route;
}