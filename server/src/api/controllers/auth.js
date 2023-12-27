import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Error from "../exceptions/error";
import { Employee } from "../models/model-export";
import { sendMailVerifiedCode } from "../../utils/mailsender";
import { sequelize } from '../models';

const genToken = (user, expiresIn = "7d") => {
    return jwt.sign({
        employeeID: user.employeeID
    },
        process.env.JWT_ACCESS_KEY, {
        expiresIn: expiresIn
    }
    );
};

const genRefreshToken = (user, expiresIn = "365d") => {
    return jwt.sign({
        employeeID: user.employeeID
    },
        process.env.JWT_REFRESH_KEY, {
        expiresIn: expiresIn
    }
    );
};

const refreshTokens = [];

export const login = async (req, res) => {
    let user = await Employee.findOne({
        where: { employeeID: req.body.employeeID },
        attributes: ['employeeID', 'fullName', 'role', 'status', 'password', 'workingPointID']
    });
    if (!user)
        return res.status(404).json(Error.getError(Error.code.invalid_employee_id));

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch)
        return res.status(400).json(Error.getError(Error.code.invalid_password))

    const accessToken = genToken(user);
    const refreshToken = genRefreshToken(user);

    refreshTokens.push(refreshToken);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
    });

    user = { ...user.get() };
    if (user.status == 'INACTIVE')
        return res.status(400).json(Error.getError(Error.code.inactive_account));

    delete user.password;

    return res.status(200).json({
        user: user,
        accessToken: accessToken
    });
};

const verifiedCodeMap = []

export const changePassword = async (req, res) => {
    const userID = req.user.employeeID;
    const newPassword = req.body.newPassword;

    if (req.query.verifiedCode) {
        if (req.query.verifiedCode == verifiedCodeMap[userID].code) {
            const t = await sequelize.transaction();
            try {
                const employee = await Employee.findByPk(userID, {transaction: t});
                employee.password = await bcrypt.hash(newPassword, 10);

                await employee.save({transaction: t});
                await t.commit({transaction: t});

                return res.status(200);
            } catch (error) {
                console.log(error);
                await t.rollback();
            }
        }
    }

    if (await bcrypt.compare(newPassword, req.user.password)) {
        return res.status(400).json(Error.getError(Error.code.duplicated_password));
    }
    
    const verifiedCode = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    if (!verifiedCodeMap[userID]) verifiedCodeMap[userID] = {};
    verifiedCodeMap[userID].code = verifiedCode;
    verifiedCodeMap[userID].password = newPassword;
    
    await sendMailVerifiedCode(req.user.email, verifiedCode);
    return res.status(200);
}

export const requestRefreshToken = async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken)
        return res.status(401).json(Error.getError(Error.code.no_refresh_token));

    if (!refreshTokens.includes(refreshToken))
        return res.status(403).json(Error.getError(Error.code.invalid_refresh_token));

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);

        const user = await Employee.findOne(
            { where: { employeeID: decoded.employeeID } }
        );

        if (!user)
            return res.status(404).json(Error.getError(Error.code.invalid_employee_id));

        const accessToken = genToken(user);

        res.status(200).json({
            accessToken
        });
    } catch (error) {
        return res.status(403).json(Error.getError(Error.code.invalid_refresh_token));
    }
};

export const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        message: 'Log out successfully'
    });
};