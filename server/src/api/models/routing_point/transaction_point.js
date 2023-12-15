module.exports = (sequelize, DataTypes) => {
    const TransactionPoints = sequelize.define("transaction_points", {
        transactionPointID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'routing_points',
                key: 'routingPointID'
            }
        },
        zipCode: {
            type: DataTypes.STRING(6),
            allowNull: true
        },
        goodsPointID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'goods_points',
                key: 'goodsPointID'
            }
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: true
        }
    }, {
        id: false,
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

    return TransactionPoints;
}
