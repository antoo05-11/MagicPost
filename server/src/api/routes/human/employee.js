import { addNewEmployee, editEmployeeInfo, getAllEmployees, getEmployeeInfo } from "../../controllers/human/employee";
import { verifyToken } from "../../middlewares/verify";

const { Router } = require("express");
const { default: catchAsync } = require("../../exceptions/catch-async");

const employeeRoute = new Router;

employeeRoute.get("/get", verifyToken, catchAsync(getAllEmployees));
employeeRoute.get("/:id",catchAsync(getEmployeeInfo));
employeeRoute.post("/add", catchAsync(addNewEmployee));
employeeRoute.put("/:id/edit", catchAsync(editEmployeeInfo));

export default employeeRoute;