import InvalidData from "../../exceptions/invalid-data";

export const validate = async (req, res, next, schema) => {
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json(new InvalidData(100000, error.details));
    next();
};