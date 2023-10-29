module.exports = (sequelize, DataTypes) => {

    const District = sequelize.define("district", {
        name: {
            type: DataTypes.STRING
        },
        districtID: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        provinceID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Province',
                key: 'provinceID'
            }
        }
    }, {
        id: false,
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    })

    return District;
}