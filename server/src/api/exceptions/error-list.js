const { default: InvalidData } = require("./invalid-data");

const ErrorList = [];
ErrorList.push(new InvalidData(10000, "Invalid Data", "Invalid Address! Check if the communeID does not match with provinceID and districtID in address object."))
ErrorList.push(new InvalidData(10001, "Invalid Data", "Invalid Email! Check if the email is invalid."))
ErrorList.push(new InvalidData(10002, "Invalid Data", "Duplicated Identifier! This identifier has been registered before."))
ErrorList.push(new InvalidData(10003, "Invalid Data", "Detail part of Address must be not null or empty!"))
ErrorList.push(new InvalidData(10004, "Invalid Data", "Invalid Phone number! Check if Phone number is invalid."))
module.exports = ErrorList