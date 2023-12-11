import Error from "../exceptions/error";

export const authorize = async (req, res, next, allowedRoles) => {
    if (allowedRoles.includes(req.user.role)) {
        next();
    }
    else {
        return res.status(400).json(Error.getError(Error.code.not_authorized));
    }
}