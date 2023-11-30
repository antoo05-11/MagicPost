module.exports = (sequelize, DataTypes) => {
    const Goods = sequelize.define("goods", {
        goodsID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        orderID: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'orders',
                key: 'orderID'
            }
        },
        goodsType: {
            type: DataTypes.ENUM('document', 'goods'),
            allowNull: true
        },
        realWeight: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        convertedWeight: {
            type: DataTypes.DOUBLE,
            allowNull: true
        }
    }, {
        id: false,
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

    return Goods;
}
