const db = require('../../models');
const Employee = db.employees;

import bcrypt from "bcryptjs";

export const getAllEmployees = async (req, res) => {
    const employees = await Employee.findAll();
    res.status(200).json(employees);
}

export const addNewEmployee = async (req, res) => {
    Employee.findAll({ where: { identifier: req.body.identifier } })
        .then((employee) => {
            if (employee) return res.status(400).json({ Error: 'Duplicated identifier!' });
        })
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let newUser = {
        identifier: req.body.identifier,
        phoneNumber: req.body.phoneNumber,
        fullName: req.body.fullName,
        addressID: req.body.addressID,
        password: hashedPassword
    }
    newUser = await Employee.create(newUser);
    return res.status(200).json(newUser);
}

export const authLogin = async (req, res) => {
    Employee.findOne({
        where: {
            employeeID: req.params.employeeID,
        }
    }).then((employeeFound) => {
        if (employeeFound.password == req.params.password) {
            return res.json(employeeFound);
        }
        else {
            return res.status(404);
        }
    })
}

export const editEmployeeInfo = async (req, res) => {
    res.status(200).json({});
}

export const getEmployeeInfo = async (req, res) => {
    res.status(200).json({ id: req.params.id });
}