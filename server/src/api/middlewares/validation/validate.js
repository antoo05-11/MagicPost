import Error from "../../exceptions/error";

export const validate = async (object, res, next, schema) => {
    const { error, value } = schema.validate(object);
    if (error) {
        let response = Error.getError(Error.code.invalid_request);
        response.setMessage(error.details[0].message.replaceAll("\"",""));
        return res.status(400).json(response);
    }
    next();
};