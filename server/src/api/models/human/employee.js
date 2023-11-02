module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define("employees", {
        employeeID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        identifier: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        fullName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        addressID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'addresses',
                key: 'addressID'
            }
        },
        role: {
            type: DataTypes.STRING(50),
            references: {
                model: 'employee_roles',
                key: 'name'
            }
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        id: false,
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

    return Employee;
}
