import { addNewEmployee, editEmployeeInfo, getAllEmployees, getEmployeeByID } from "../../controllers/human/employee";
import { getAllEmployeeRoles } from "../../controllers/human/employee_role";
import { authorize } from "../../middlewares/authorize";
import { employee_adding_schema, employee_editting_schema } from "../../middlewares/validation/employee_schema";
import { validate } from "../../middlewares/validation/validate";
import { verifyToken } from "../../middlewares/verify";
import { role } from "../../models/human/role";


const { Router } = require("express");
const { default: catchAsync } = require("../../exceptions/catch-async");

const employeeRoute = new Router;

employeeRoute.get("/get", verifyToken,
    (req, res, next) => authorize(req, res, next, [role.MANAGER, role.TRANSACTION_POINT_EMPLOYEE]),
    catchAsync(getAllEmployees));

employeeRoute.get("/:id/get", catchAsync(getEmployeeByID));

employeeRoute.post("/add",
    (req, res, next) => validate(req, res, next, employee_adding_schema),
    catchAsync(addNewEmployee));

employeeRoute.put("/:id/edit",
    (req, res, next) => validate(req, res, next, employee_editting_schema),
    catchAsync(editEmployeeInfo));

employeeRoute.get("/getAllRoles", catchAsync(getAllEmployeeRoles))

export default employeeRoute;