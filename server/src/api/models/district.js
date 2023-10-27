module.exports = (sequelize, DataTypes) => {

    const District = sequelize.define("district", {
        name: {
            type: DataTypes.STRING
        },
        districtID: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    }, {
        id: false,
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    })

    return District
}