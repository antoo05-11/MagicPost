import Joi from "joi";

export const statistic_schema = Joi.object({
    minDate: Joi.string().optional(),
    maxDate: Joi.string().optional(),
    routingPointID: Joi.number().integer().min(1).optional()
}).when(
    Joi.object({ minDate: Joi.exist(), maxDate: Joi.not().exist() }),
    { then: Joi.object({ maxDate: Joi.required() }) }
).when(
    Joi.object({ maxDate: Joi.exist(), minDate: Joi.not().exist() }),
    { then: Joi.object({ minDate: Joi.required() }) }
);