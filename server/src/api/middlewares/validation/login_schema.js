const Joi = require('joi');

export const login_schema = Joi.object({
    employeeID: Joi.string()
        .length(8)
        .required(),

    password: Joi.string()
        .min(8)
        .required()
});