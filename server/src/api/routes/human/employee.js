import { addNewEmployee, editEmployeeInfo, getAllEmployees, getEmployeeByID } from "../../controllers/human/employee";
import { getAllEmployeeRoles } from "../../controllers/human/employee_role";
import { authorize } from "../../middlewares/authorize";
import { employee_adding_schema, employee_editting_schema, employee_filter_schema } from "../../middlewares/validation/employee_schema";
import { validate } from "../../middlewares/validation/validate";
import { verifyToken } from "../../middlewares/verify";
import { role } from "../../models/human/role";
import { Router } from "express";

const { default: catchAsync } = require("../../exceptions/catch-async");

const employeeRoute = new Router();

employeeRoute.get("/get", verifyToken,
    (req, res, next) => authorize(req, res, next,
        [role.GOODS_POINT_HEAD,
        role.TRANSACTION_POINT_HEAD,
        role.MANAGER]),
    (req, res, next) => validate(req.query, res, next, employee_filter_schema),
    catchAsync(getAllEmployees));

employeeRoute.get("/:id/get", catchAsync(getEmployeeByID));

employeeRoute.post("/add",
    verifyToken,
    (req, res, next) => authorize(req, res, next,
        [role.MANAGER,
        role.TRANSACTION_POINT_HEAD,
        role.GOODS_POINT_HEAD]),
    (req, res, next) => validate(req.body, res, next, employee_adding_schema),
    catchAsync(addNewEmployee));

employeeRoute.put("/:id/edit",
    (req, res, next) => validate(req.body, res, next, employee_editting_schema),
    catchAsync(editEmployeeInfo));

employeeRoute.get("/getAllRoles", verifyToken, catchAsync(getAllEmployeeRoles))

export default employeeRoute;