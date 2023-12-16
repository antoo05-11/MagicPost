import Error from "../exceptions/error";
import jwt from "jsonwebtoken";

const db = require('../models');
const Employee = db.employees;

export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const bearer = "Bearer ";

        if (!authHeader || !authHeader.startsWith(bearer)) {
            return res.status(401).json(Error.getError(Error.code.no_credentials_sent))
        }

        const token = authHeader.replace(bearer, "");
        const secretKey = process.env.JWT_ACCESS_KEY || "";

        const decoded = jwt.verify(token, secretKey);
        
        const user = await Employee.findOne({ where: { employeeID: decoded.employeeID } });

        if (!user) {
            return res.status(401).json(Error.getError(Error.code.authentication_failed));
        }

        req.user = user;
        next();
    } catch (e) {
        return res.status(401).json(Error.getError(Error.code.token_expired));
    }
};

