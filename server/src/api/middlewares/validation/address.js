import Joi from 'joi';

export const cost_estimation_schema = Joi.object({
    startProvinceID: Joi.number().integer().min(1).required(),
    endProvinceID: Joi.number().integer().min(1).required(),
    weight: Joi.number().integer().min(0).optional()
});