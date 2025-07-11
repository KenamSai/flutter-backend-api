import { body } from "express-validator"
export const productValidator=[
    body("name").notEmpty().withMessage("Name is required"),
    body("price").notEmpty().withMessage("Price is required"),
    body("category").notEmpty().withMessage("Category is required"),
]