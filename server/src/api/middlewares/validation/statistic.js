import Joi from "joi";

export const profit_statistic_schema = Joi.object({
    minDate: Joi.string().optional(),
    maxDate: Joi.string().optional()
});