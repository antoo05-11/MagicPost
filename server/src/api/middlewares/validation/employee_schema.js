const Joi = require('joi');

export const employee_adding_schema = Joi.object({
    identifier: Joi.string()
        .length(12)
        .pattern(/^[0-9]+$/)
        .required(),

    phoneNumber: Joi.string().length(10)
        .pattern(/^[0-9]+$/)
        .required(),

    fullName: Joi.string().pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/).required(),

    address: {
        detail: Joi.string().required(),
        communeID: Joi.number().integer().required(),
        districtID: Joi.number().integer().required(),
        provinceID: Joi.number().integer().required()
    },

    workingPointID: Joi.number().integer().allow(null),

    email: Joi.string().email().required(),

    role: Joi.string().allow(null)
});

export const employee_editting_schema = Joi.object({
    identifier: Joi.string()
        .length(12)
        .pattern(/^[0-9]+$/)
        .required(),

    phoneNumber: Joi.string().length(10)
        .pattern(/^[0-9]+$/)
        .required(),

    fullName: Joi.string().pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/).required(),

    address: {
        detail: Joi.string().required(),
        communeID: Joi.number().integer().required(),
        districtID: Joi.number().integer().required(),
        provinceID: Joi.number().integer().required()
    },

    workingPointID: Joi.number().integer().allow(null),

    email: Joi.string().email().required(),

    role: Joi.string().allow(null)
});