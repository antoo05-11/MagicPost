module.exports = (sequelize, DataTypes) => {

    const RoutingPoint = sequelize.define("routing_points", {
        routingPointID: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        addressID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'addresses',
                key: 'addressID'
            }
        }
    }, {
        id: false,
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    })

    return RoutingPoint;
}