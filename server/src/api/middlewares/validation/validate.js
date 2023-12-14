import Error from "../../exceptions/error";

export const validate = async (req, res, next, schema) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
        let response = Error.getError(Error.code.invalid_request_body);
        response.setMessage(error.details[0].message.replaceAll("\"",""));
        return res.status(400).json(response);
    }
    next();
};