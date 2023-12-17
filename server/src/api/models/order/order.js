module.exports = (sequelize, DataTypes) => {
    const Orders = sequelize.define("orders", {
        orderID: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        senderID: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        receiverID: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        sentTime: {
            type: DataTypes.DATE,
            allowNull: true
        },
        receivedTime: {
            type: DataTypes.DATE,
            allowNull: true
        },
        failChoice: {
            type: DataTypes.ENUM('return', 'destroy'),
            allowNull: true
        },
        mainPostage: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 0
        },
        addedPostage: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        VATFee: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        otherFee: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        receiverCOD: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        receiverOtherFee: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        startTransactionPointID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'transaction_points',
                key: 'transactionPointID'
            }
        },
        endTransactionPointID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'transaction_points',
                key: 'transactionPointID'
            }
        },
        specialService: {
            type: DataTypes.STRING,
            allowNull: true
        },
        creatorID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'employees',
                key: 'employeeID'
            }
        },
        status: {
            type: DataTypes.ENUM('delivering', 'delivered'),
            allowNull: true,
            defaultValue: 'delivering'
        }
    }, {
        id: false
    });
    return Orders;
}
