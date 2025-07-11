import express from "express"
import { createProduct, getProduct, updateProduct, deleteProduct, filterProducts,sortProducts } from "../controllers/productsController.js"
import { productValidator } from "../validators/productValidators.js"
import { productValidate } from "../middlewares/validator.js"
const router = express.Router()

router.post("/",
    productValidator,productValidate ,createProduct
)
// ✅ GET route - Fetch all products
router.get("/", getProduct
);

router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)
router.get("/filterProducts", filterProducts)
router.get("/sortProducts", sortProducts)
export default router