import Joi from "joi";

export const process_updating_schema = Joi.object({
    status: Joi.string().valid('on_stock', 'forwarded', 'customer_sent', 'customer_returned').required()
});