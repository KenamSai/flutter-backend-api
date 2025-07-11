import mongoose from "mongoose"
const productSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Enter Name"], },
    price: { type: Number, required: true, min: [0, "Enter price greater than zero"], max: [10000, "Enter price less than 10000"], },
    category: {
        type: String, required: [true, "Enter Category"], enum: { values: ['electronics', 'clothes', "books", "food",], message: '{VALUE} is not valid {PATH}' }, lowercase: true,
    },
    instock: { type: Boolean, default: true, },
}, { timestamps: true, collection: "Products" })
const productModel = mongoose.model("products", productSchema)
export default productModel