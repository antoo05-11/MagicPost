import Error from "./error";

export default (func) => async (req, res, next) => {
    try {
        await func(req, res, next);
    } catch (error) {
        console.log(error);
        return res.status(500).json(Error.buildErrorRes("Internal Server Error"));
    }
};