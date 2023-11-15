const db = require('../../models');
const Employee = db.employees;
const Address = db.addresses;

import bcrypt from "bcryptjs";
import { getAddressByID } from "../routing_point/address";
import { generateRandomPassword, normalizeName } from "../../../utils";
import HttpException from "../../exceptions/http-exception";

export const getAllEmployees = async (req, res) => {
    const employees = await Employee.findAll();
    let processedResult = [];
    for (const employee of employees) {
        const cloneEmployee = { ...employee.get() };
        delete cloneEmployee.password;
        const address = await getAddressByID(cloneEmployee.addressID);
        cloneEmployee.address = address;
        delete cloneEmployee.addressID;
        processedResult.push(cloneEmployee);
    }
    return res.status(200).json(processedResult);
}

export const addNewEmployee = async (req, res) => {
    let employee = await Employee.findOne({ where: { identifier: req.body.identifier } });
    if (employee) {
        throw new HttpException(400, 'Duplicated identifier!');
    }
    const password = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(password, 10);
    let newAddress = {
        detail: req.body.address.detail,
        communeID: req.body.address.communeID,
        districtID: req.body.address.districtID,
        provinceID: req.body.address.provinceID
    }
    newAddress = await Address.create(newAddress);
    if (!newAddress) {
        throw new HttpException(400, "Invalid Address!");
    }
    let newUser = {
        identifier: req.body.identifier,
        phoneNumber: req.body.phoneNumber,
        fullName: normalizeName(req.body.fullName),
        addressID: newAddress.null,
        email: req.body.email,
        workingPointID: req.body.workingPointID,
        password: hashedPassword,
        role: req.body.role
    }
    newUser = await Employee.create(newUser);
    if (!newUser) {
        throw new HttpException(400, "Cannot add new employee!")
    }
    const cloneNewUser = { ...newUser.get() };
    cloneNewUser.address = await getAddressByID(cloneNewUser.addressID);
    cloneNewUser.password = password;
    return res.status(200).json(cloneNewUser);
}

export const editEmployeeInfo = async (req, res) => {
    return res.status(200).json({});
}

export const getEmployeeInfo = async (req, res) => {
    return res.status(200).json({ id: req.params.id });
}