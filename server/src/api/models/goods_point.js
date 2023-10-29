module.exports = (sequelize, DataTypes) => {
    const GoodsPoints = sequelize.define("goods_points", {
        goodsPointID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        addressID: {
            type: DataTypes.INTEGER,
            allowNull: true,
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
    });

    return GoodsPoints;
}