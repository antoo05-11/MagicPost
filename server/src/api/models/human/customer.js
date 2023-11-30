module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define("customers", {
        customerID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fullname: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        addressID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Address',
                key: 'addressID'
            }, allowNull: false
        }
    }, {
        id: false,
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });
    return Customer;
}