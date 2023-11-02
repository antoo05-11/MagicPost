module.exports = (sequelize, DataTypes) => {
    const EmployeeRole = sequelize.define("employee_roles", {
        name: {
            type: DataTypes.STRING(100),
            primaryKey: true
        }
    }, {
        id: false,
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });
    return EmployeeRole;
}