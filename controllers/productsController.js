import productModel from "../models/products.js"
export const createProduct = async (req, res, next) => {
    try {

        const { name, price, category, instock } = req.body
        const product = productModel({ name, price, category, instock })
        const savedProduct = await product.save()
        if (savedProduct) {
            res.status(200).send({ Status: 200, Status_Message: savedProduct.name + " is saved successfully" })
        }
        else {
            return res.status(400).json({ "Status": 400, "Status_Message": "Product save failed" })
        }


    } catch (error) {
        next(error)
    }

}

export const getProduct = async (req, res, next) => {
    try {
        const products = await productModel.find().select("-_id -createdAt -updatedAt -__v");
        const { _id, createdAt, updatedAt, __V, ...body } = products
        res.status(200).json({ Status: 200, Status_Message: "Successful", Products: products });
    } catch (error) {
        next(error);
    }
}
export const updateProduct = async (req, res, next) => {
    try {
        const id = req.params.id
        const { _id, ...body } = req.body//object destructuring with rest operator ,so extracting id from total so id is removed from body
        const updatedProduct = await productModel.findByIdAndUpdate(id, body, {
            new: true,//returns updated
            runValidators: true//runs schema validations
        })
        if (!updatedProduct) {
            return res.status(400).json({ "Status": 400, "Status_Message": "Product not found" })
        } else { res.status(200).send({ Status: 200, Status_Message: updatedProduct.name + " is updated successfully" }) }

    } catch (error) {
        next(error)
    }
}
export const deleteProduct = async (req, res, next) => {
    const id = req.params.id
    try {
        const deletedProduct = await productModel.findByIdAndDelete(id)
        if (!deletedProduct) {
            return res.status(400).json({ "Status": 400, "Status_Message": "Product not found" })
        } else { res.status(200).send({ Status: 200, Status_Message: "Product  deleted successfully", deletedProduct: deletedProduct }) }
    } catch (error) {
        next(error)
    }

}
export const filterProducts = async(req, res, next) => {
    const { category, price } = req.query
    try {
        let filter = {}
        if (price) {
            filter.price = { $lt: price }
        }
        if (category) {
            filter.category = category
        }
        const products = await productModel.find(filter).select("-_id -createdAt -updatedAt -__v")
        if (products) {
            return res.status(200).json({Status: 200, Status_Message: "Success",data:products })
        } else {
            return res.status(200).json({Status: 400, Status_Message: "No Products" })
        }

    } catch (error) {
        next(error)
    }
}

export const sortProducts = async(req, res, next) => {
    let sort = req.query.sort
    let sortObj={}
    if (sort) {
        const sortField = sort.startsWith("-") ? sort.slice(1) : sort
        const sortOrder = sort.startsWith("-") ? -1 : 1
        sortObj[sortField]=sortOrder
        
    }
    try {
        
        const products = await productModel.find().sort(sortObj).select("-_id -createdAt -updatedAt -__v")
        if (products) {
            return res.status(200).json({Status: 200, Status_Message: "Success",data:products })
        } else {
            return res.status(200).json({Status: 400, Status_Message: "No Products" })
        }

    } catch (error) {
        next(error)
    }
}

