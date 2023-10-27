module.exports = (sequelize, DataTypes) => {

    const Commune = sequelize.define("commune", {
        name: {
            type: DataTypes.STRING
        },
        communeID: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    }, {
        id: false,
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    })

    return Commune;
}