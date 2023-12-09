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
import { getAddressByID } from "../routing_point/address";
import { generateRandomPassword, normalizeName } from "../../../utils";
import { sequelize } from '../../models';
import ErrorList from "../../exceptions/error-list";

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
    if (employee) {
        return res.status(409).json(ErrorList[1]);
    }

    // Check validation of Address.
    let newAddress = {
        detail: req.body.address.detail,
        communeID: req.body.address.communeID,
        districtID: req.body.address.districtID,
        provinceID: req.body.address.provinceID
    }

    const password = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(password, 10);

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
    const t = await sequelize.transaction();
    const employee = await Employee.findOne({ where: { employeeID: req.params.id } });
    
    return res.status(200).json({});
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