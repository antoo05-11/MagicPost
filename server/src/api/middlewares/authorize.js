import HttpException from "../exceptions/http-exception";

export const authorize = async (req, res, next, allowedRoles) => {
    try {
        if (allowedRoles.includes(req.user.role)) {
            next();
        }
        else {
            throw new HttpException(400, "Not authorized!")
        }
    } catch (err) {
        next(err);
    }
}