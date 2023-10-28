module.exports = (sequelize, DataTypes) => {

    const Address = sequelize.define("address", {
        addressID: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        communeID: {
            type: DataTypes.INTEGER
        },
        districtID: {
            type: DataTypes.INTEGER
        },
        provinceID: {
            type: DataTypes.INTEGER
        },
        detail: {
            type: DataTypes.STRING
        },
        exactPosition: {
            type: DataTypes.STRING
        }
    }, {
        id: false,
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    })

    return Address;
}