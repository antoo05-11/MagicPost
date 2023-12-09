import { addNewEmployee, editEmployeeInfo, getAllEmployees, getEmployeeByID } from "../../controllers/human/employee";
import { getAllEmployeeRoles } from "../../controllers/human/employee_role";
import { authorize } from "../../middlewares/authorize";
import { verifyToken } from "../../middlewares/verify";
import { role } from "../../models/human/role";


const { Router } = require("express");
const { default: catchAsync } = require("../../exceptions/catch-async");

const employeeRoute = new Router;

employeeRoute.get("/get", verifyToken,
    (req, res, next) => authorize(req, res, next, [role.MANAGER, role.TRANSACTION_POINT_EMPLOYEE]),
    catchAsync(getAllEmployees));

employeeRoute.get("/:id/get", catchAsync(getEmployeeByID));
employeeRoute.post("/add", catchAsync(addNewEmployee));
employeeRoute.put("/:id/edit", catchAsync(editEmployeeInfo));

employeeRoute.get("/getAllRoles", catchAsync(getAllEmployeeRoles))

export default employeeRoute;