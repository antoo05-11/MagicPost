import bcrypt from "bcryptjs";
import HttpException from "../exceptions/http-exception";
import jwt from "jsonwebtoken";
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

export const login = async (req, res, next) => {

    const user = await Employee.findOne({
        where: { employeeID: req.body.employeeID }
    });
    if (!user) throw new HttpException(404, "User not found");

    //const encrypted = await crypto.encrypt("password");
    //console.log(encrypted);

    // let passwordInput = "";
    // try {
    //     passwordInput = await crypto.decrypt(req.body.password);
    // } catch (err) {
    //     throw new HttpException(400, "Incorrect password");
    // }

    // **Not decrypt input password.
    console.log(req.body.password);
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) throw new HttpException(400, "Incorrect password");

    const accessToken = genToken(user);
    const refreshToken = genRefreshToken(user);

    refreshTokens.push(refreshToken);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
    });

    res.status(200).json({
        accessToken
    });
};

export const requestRefreshToken = async (req, res) => {
    const {
        refreshToken
    } = req.cookies;

    if (!refreshToken) throw new HttpException(400, "No refresh token");

    if (!refreshTokens.includes(refreshToken)) throw new HttpException(403, "Refresh token is invalid");

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);

        const user = await Employee.findOne(
            { where: { employeeID: decoded.employeeID } }
        );

        if (!user) throw new HttpException(404, "User not found");

        const accessToken = genToken(user);

        res.status(200).json({
            accessToken
        });
    } catch (error) {
        throw new HttpException(401, "Invalid refresh token");
    }
};

export const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        message: 'Log out successfully'
    });
};