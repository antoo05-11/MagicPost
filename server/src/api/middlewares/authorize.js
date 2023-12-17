import Error from "../exceptions/error";

// This ID is used for testing all features of all roles.
const testingAccountID = 23000022;

export const authorize = async (req, res, next, allowedRoles) => {
    if (allowedRoles.includes(req.user.role) || req.user.employeeID === testingAccountID) {
        next();
    }
    else {
        return res.status(400).json(Error.getError(Error.code.not_authorized));
    }
}