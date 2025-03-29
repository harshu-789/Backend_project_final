import { Product } from "../models/product.model.js";

//Get all Products

export const getAllProducts = async (req,res,next)=> {
    try {
        const products  = await Product.find()
        res.json({success : true, data: products})
    } catch (error) {
        next(error) // Passes the error to the error-handling middleware
    }
}
// get product by id
export const getProductByID = async(req,res,next)=>{
    try {
        const productId = req.params.id
        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({ message : "Product not Found"})
        }
        res.json({ success: true, data: product });
    } catch (error) {
        next(error)
    }
}
// creating new product
export const createProduct = async (req,res,next)=>{
    try {
        const {name,description,stockQuantity,price} = req.body
        // const image = req.file ? `/uploads/${req.file.filename}` : null;

        const newProduct = {
            name,
            description,
            price,
            stockQuantity,
            
        }
        const createdProduct = await Product.create(newProduct)
        res.status(201).json({  message : "Product Created Successfully", data: createdProduct });
    } catch (error) {
        next(error)
    }
}

