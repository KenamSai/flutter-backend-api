import { validationResult } from "express-validator";
export const productValidate = async (req, res, next) => {
    const errors = validationResult(req);
    const missingFields = errors.array().map(err => err.msg);
    if (!errors.isEmpty()) {
        return res.status(400).json({ "Status": 400, "Status_Message": missingFields, })
    }
    next()
}