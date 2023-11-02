import { addNewEmployee, editEmployeeInfo, getAllEmployees, getEmployeeInfo } from "../../controllers/human/employee";

const { Router } = require("express");
const { default: catchAsync } = require("../../exceptions/catch-async");

const employeeRoute = new Router;

employeeRoute.get("/get", catchAsync(getAllEmployees));
employeeRoute.get("/:id", catchAsync(getEmployeeInfo));
employeeRoute.post("/add", catchAsync(addNewEmployee));
employeeRoute.put("/:id/edit", catchAsync(editEmployeeInfo));

export default employeeRoute;