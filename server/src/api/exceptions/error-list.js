const { default: InvalidData } = require("./invalid-data");

const ErrorList = [];
ErrorList.push(new InvalidData(10001, "Invalid Data", "Invalid Address! Check if the commune ID does not match with province ID and district ID in address object."))
ErrorList.push(new InvalidData(10002, "Invalid Data", "Duplicated Identifier! This identifier has been registered before."))
ErrorList.push(new InvalidData(10003, "Invalid Data", "Invalid Employee ID! Check employee ID again."))
ErrorList.push(new InvalidData(10004, "Invalid Data", "Invalid Working Address ID! Working address ID cannot be found or does not match with role registered."))
module.exports = ErrorList