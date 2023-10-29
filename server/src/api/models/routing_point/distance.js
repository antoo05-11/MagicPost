module.exports = (sequelize, DataTypes) => {

    const Distance = sequelize.define("distance", {
        originID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Address',
                key: 'addressID'
            }
        },
        destinationID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Address',
                key: 'addressID'
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

    return Distance;
}