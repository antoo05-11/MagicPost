const db = require('../../models');

const Employee = db.employees;
const Address = db.addresses;
const Commune = db.communes;
const District = db.districts;
const Province = db.provinces;
const RoutingPoint = db.routing_points;
const TransactionPoint = db.transaction_points;
const GoodsPoint = db.goods_points;

Employee.belongsTo(Address, { foreignKey: 'addressID', as: 'address' });
Address.belongsTo(Commune, { foreignKey: 'communeID' });
Commune.belongsTo(District, { foreignKey: 'districtID' });
District.belongsTo(Province, { foreignKey: 'provinceID' });
RoutingPoint.belongsTo(Address, { foreignKey: 'addressID' });
Employee.belongsTo(RoutingPoint, { foreignKey: 'workingPointID', as: 'workingPoint' });

import bcrypt from "bcryptjs";
import { checkAddress, getAddressByID } from "../routing_point/address";
import { generateRandomPassword, normalizeName } from "../../../utils";
import { sequelize } from '../../models';
import ErrorList from "../../exceptions/error-list";
import { role } from "../../models/human/role";

const pageSize = 10;

export const getAllEmployees = async (req, res) => {
    let pageIndex = req.query.page;
    if (pageIndex == undefined) {
        pageIndex = 1
    }

    const employees = await Employee.findAll({
        offset: (pageIndex - 1) * pageSize,
        limit: pageSize
    });

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
    if (employee) return res.status(409).json(ErrorList[1]);

    let newAddress = {
        detail: req.body.address.detail,
        communeID: req.body.address.communeID,
        districtID: req.body.address.districtID,
        provinceID: req.body.address.provinceID
    }

    if (!(await checkAddress(newAddress))) return res.status(400).json(ErrorList[0]);

    const password = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser = {}

    const t = await sequelize.transaction()
    try {
        newAddress = await Address.create(newAddress, { transaction: t });

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

        newUser = await Employee.create(newUser, { transaction: t });

        await t.commit()
    } catch (error) {
        await t.rollback();
        console.error(error);
        return res.status(500);
    }
    const cloneNewUser = newUser.dataValues;
    cloneNewUser.address = await getAddressByID(cloneNewUser.addressID);
    cloneNewUser.password = password;
    return res.status(200).json(cloneNewUser);
}

export const editEmployeeInfo = async (req, res) => {
    let newEmployee = { ...req.body };

    let employee = await Employee.findOne({ where: { employeeID: req.params.id } });
    if (!employee) return res.status(404).json(ErrorList[2]);

    let employees = await Employee.findAll({ where: { identifier: newEmployee.identifier } });
    if (employees.length > 1
        || (employees.length == 1
            && employee.identifier != newEmployee.identifier)) {
        return res.status(409).json(ErrorList[1]);
    }

    let address = await Address.findOne({ where: { addressID: employee.addressID } });
    let newAddress = newEmployee.address;
    if (newAddress && !(await checkAddress(newAddress, address))) return res.status(400).json(ErrorList[0]);

    let newRole = employee.role;
    if (newEmployee.role) newRole = newEmployee.role;
    if (newEmployee.workingPointID) {
        if (newRole == role.TRANSACTION_POINT_HEADER || role.TRANSACTION_POINT_EMPLOYEE) {
            if (!(await TransactionPoint.findOne({
                where: { transactionPointID: newEmployee.workingPointID }
            }))) return res.status(400).json(ErrorList[3]);
        }
        else if (newRole == role.GOODS_POINT_EMPLOYEE || role.GOODS_POINT_HEADER) {
            if (!(await GoodsPoint.findOne({
                where: { goodsPointID: newEmployee.workingPointID }
            }))) return res.status(400).json(ErrorList[3]);
        }
        else {
            if (!(await RoutingPoint.findOne({
                where: { routingPointID: newEmployee.workingPointID }
            }))) return res.status(400).json(ErrorList[3]);
        }
    }

    const t = await sequelize.transaction();
    try {
        if (newAddress) {
            if (newAddress.detail) address.detail = newAddress.detail;
            if (newAddress.communeID) address.communeID = newAddress.communeID;
            if (newAddress.districtID) address.districtID = newAddress.districtID;
            if (newAddress.provinceID) address.provinceID = newAddress.provinceID;
            await address.save({ transaction: t });
        }

        if (newEmployee.identifier) {
            employee.identifier = newEmployee.identifier;
        }

        if (newEmployee.phoneNumber) {
            employee.phoneNumber = newEmployee.phoneNumber;
        }

        if (newEmployee.fullName) {
            employee.fullName = newEmployee.fullName;
        }

        if (newEmployee.workingPointID) {
            employee.workingPointID = newEmployee.workingPointID;
        }

        if (newEmployee.role) {
            employee.role = newEmployee.role;
        }

        if (newEmployee.status) {
            employee.status = newEmployee.status;
        }

        await employee.save({ transaction: t });
        await t.commit()
    } catch (error) {
        await t.rollback();
        console.error(error);
        return res.status(500);
    }

    await getEmployeeByID({ params: { id: employee.employeeID } }, res);
}

export const getEmployeeByID = async (req, res) => {
    let employee = await Employee.findOne(
        {
            where: {
                employeeID: req.params.id
            },
            include: [
                {
                    model: Address,
                    as: 'address',
                    attributes: ['addressID', 'detail'],
                    include: [
                        {
                            model: Commune,
                            attributes: ['communeID', 'name']
                        },
                        {
                            model: District,
                            attributes: ['districtID', 'name']
                        },

                        {
                            model: Province,
                            attributes: ['provinceID', 'name']
                        }
                    ]
                },
                {
                    model: RoutingPoint,
                    as: 'workingPoint',
                    attributes: ['routingPointID'],
                    include: {
                        model: Address,
                        attributes: ['addressID'],
                        include: [
                            {
                                model: Commune,
                                attributes: ['communeID', 'name']
                            },
                            {
                                model: District,
                                attributes: ['districtID', 'name']
                            },

                            {
                                model: Province,
                                attributes: ['provinceID', 'name']
                            }
                        ]
                    }

                }
            ]
        }
    )
    if (!employee) return res.status(404).json();

    employee = { ...employee.get() };
    delete employee.password;
    delete employee.addressID;

    return res.status(200).json(employee);
} 