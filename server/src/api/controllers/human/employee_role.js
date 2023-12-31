import { EmployeeRole } from '../../models/model-export';

export const getAllEmployeeRoles = async (req, res) => {
    let result = [];
    const employeeRoles = await EmployeeRole.findAll();
    for (const role of employeeRoles) {
        result.push(role.name);
    }
    return res.status(200).json(result);
}