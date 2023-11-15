import { addNewEmployee, editEmployeeInfo, getAllEmployees, getEmployeeInfo } from "../../controllers/human/employee";
import { authorize } from "../../middlewares/authorize";
import { verifyToken } from "../../middlewares/verify";
import { role } from "../../models/human/role";


const { Router } = require("express");
const { default: catchAsync } = require("../../exceptions/catch-async");

const employeeRoute = new Router;

employeeRoute.get("/get", verifyToken,
    (req, res, next) => authorize(req, res, next, [role.MANAGER, role.TRANSACTION_POINT_EMPLOYEE]),
    catchAsync(getAllEmployees));

employeeRoute.get("/:id", catchAsync(getEmployeeInfo));
employeeRoute.post("/add", catchAsync(addNewEmployee));
employeeRoute.put("/:id/edit", catchAsync(editEmployeeInfo));

export default employeeRoute;