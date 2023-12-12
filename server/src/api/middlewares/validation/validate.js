import Error from "../../exceptions/error";

export const validate = async (req, res, next, schema) => {
    const { error, value } = schema.validate(req);
    if (error) return res.status(400).json(Error.getError(Error.code.invalid_request_body));
    next();
};