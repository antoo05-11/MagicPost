module.exports = (sequelize, DataTypes) => {
    const Processes = sequelize.define("processes", {
        orderID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        addressID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'addresses',
                key: 'addressID'
            },
            primaryKey: true
        },
        previousAddressID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'addresses',
                key: 'addressID'
            }
        },
        arrivedTime: {
            type: DataTypes.DATE,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('arrived', 'onway'),
            allowNull: false
        }
    }, {
        id: false,
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });
    return Processes;
}
