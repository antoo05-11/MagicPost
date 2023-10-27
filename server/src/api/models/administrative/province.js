module.exports = (sequelize, DataTypes) => {

    const Province = sequelize.define("provinces", {
        name: {
            type: DataTypes.STRING
        },
        provinceID: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    }, {
        id: false,
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    })

    return Province;
}