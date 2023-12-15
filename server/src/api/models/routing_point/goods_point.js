module.exports = (sequelize, DataTypes) => {
    const GoodsPoints = sequelize.define("goods_points", {
        goodsPointID: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    }, {
        id: false,
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

    return GoodsPoints;
}