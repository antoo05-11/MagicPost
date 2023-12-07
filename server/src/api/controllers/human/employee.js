const db = require('../../models');
const EmailValidator = require("email-validator");
const { parsePhoneNumber } = require('libphonenumber-js');

const Employee = db.employees;
const Address = db.addresses;
const Commune = db.communes;
const District = db.districts;
const Province = db.provinces;

Commune.belongsTo(District, { foreignKey: 'districtID' });
District.belongsTo(Province, { foreignKey: 'provinceID' });

import bcrypt from "bcryptjs";
import { getAddressByID } from "../routing_point/address";
import { generateRandomPassword, normalizeName } from "../../../utils";
import { sequelize } from '../../models';
import ErrorList from "../../exceptions/error-list";


export const getAllEmployees = async (req, res) => {
    let pageIndex = req.query.page;
    if (pageIndex == undefined) {
        pageIndex = 1
    }

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
        return res.status(409).json(ErrorList[2])
    }
    const password = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check validation of Address.
    let newAddress = {
        detail: req.body.address.detail,
        communeID: req.body.address.communeID,
        districtID: req.body.address.districtID,
        provinceID: req.body.address.provinceID
    }
    if (!newAddress.detail) return res.status(400).json(ErrorList[3]);

    let checkAddress = await Commune.findOne({
        where: {
            communeID: newAddress.communeID
        },
        include: [{
            model: District,
            attributes: ['districtID'],
            include: [{
                model: Province,
                attributes: ['provinceID']
            }]
        }],
        attributes: ['communeID']
    });
    if (checkAddress.district.districtID != newAddress.districtID
        || checkAddress.district.province.provinceID != newAddress.provinceID) {
        return res.status(400).json(ErrorList[0]);
    }

    let newUser = {}

    const t = await sequelize.transaction()
    try {
        newAddress = await Address.create(newAddress, { transaction: t });

        // Check validation of new user information.
        newUser = {
            identifier: req.body.identifier,
            phoneNumber: req.body.phoneNumber,
            fullName: normalizeName(req.body.fullName),
            addressID: newAddress.dataValues.addressID,
            email: req.body.email,
            workingPointID: req.body.workingPointID,
            password: hashedPassword,
            role: req.body.role
        }
        if (!EmailValidator.validate(newUser.email))
            return res.status(400).json(ErrorList[1]);
        if (!isValidPhoneNumber(newUser.phoneNumber, 'VN')) {
            return res.status(400).json(ErrorList[4]);
        }

        newUser = await Employee.create(newUser, { transaction: t });

        await t.commit()
    } catch (error) {
        await t.rollback();
        console.error(error);
    }
    const cloneNewUser = newUser.dataValues;
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

function isValidPhoneNumber(phoneNumber, countryCode) {
    if (phoneNumber.toString().length !== 10) return false;
    try {
        const parsedNumber = parsePhoneNumber(phoneNumber, countryCode);
        return parsedNumber.isValid();
    } catch (error) {
        console.error('Lỗi khi kiểm tra số điện thoại:', error.message);
        return false;
    }
}