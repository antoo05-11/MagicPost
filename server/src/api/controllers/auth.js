import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Error from "../exceptions/error";
const Crypto = require('node-crypt');

const db = require('../models');
const Employee = db.employees;

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

const crypto = new Crypto({
    key: 'b95d8cb128734ff8821ea634dc34334535afe438524a782152d11a5248e71b01',
    hmacKey: 'dcf8cd2a90b1856c74a9f914abbb5f467c38252b611b138d8eedbe2abb4434fc'
});

export const login = async (req, res) => {
    const user = await Employee.findOne({
        where: { employeeID: req.body.employeeID }
    });
    if (!user)
        return res.status(404).json(Error.getError(Error.code.invalid_employee_id));

    //const encrypted = await crypto.encrypt("password");
    //console.log(encrypted);

    // let passwordInput = "";
    // try {
    //     passwordInput = await crypto.decrypt(req.body.password);
    // } catch (err) {
    //     throw new HttpException(400, "Incorrect password");
    // }

    // **Not decrypt input password.

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch)
        return res.status(400).json(Error.get(Error.code.invalid_password))

    const accessToken = genToken(user);
    const refreshToken = genRefreshToken(user);

    refreshTokens.push(refreshToken);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
    });

    let clone = { ...user.get() };
    delete clone.password;

    return res.status(200).json({
        user: clone,
        accessToken: accessToken
    });
};

export const requestRefreshToken = async (req, res) => {
    const {
        refreshToken
    } = req.cookies;

    if (!refreshToken)
        return res.status(404).json(Error.getError(Error.code.no_refresh_token));

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