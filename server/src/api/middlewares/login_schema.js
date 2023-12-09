import InvalidData from '../exceptions/invalid-data';

const Joi = require('joi');

export const login_schema = Joi.object({
    employeeID: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
});

export const validate = async (req, res, next, schema) => {
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json(new InvalidData(100000, error));
    next();
};