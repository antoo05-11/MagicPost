const { default: InvalidData } = require("./invalid-data");

const ErrorList = [];
ErrorList.push(new InvalidData(10001, "Invalid Data", "Invalid Address! Check if the communeID does not match with provinceID and districtID in address object."))
ErrorList.push(new InvalidData(10002, "Invalid Data", "Duplicated Identifier! This identifier has been registered before."))
module.exports = ErrorList