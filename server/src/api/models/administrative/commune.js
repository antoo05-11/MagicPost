module.exports = (sequelize, DataTypes) => {

    const Commune = sequelize.define("commune", {
        name: {
            type: DataTypes.STRING
        },
        communeID: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        districtID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'District',
                key: 'districtID'
            }
        }
    }, {
        id: false,
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    })

    return Commune;
}