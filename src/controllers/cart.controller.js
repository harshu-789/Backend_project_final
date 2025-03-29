import { Product } from "../models/product.model.js";
import {Cart}  from "../models/cart.model.js";


// get user cart

export const getUserCart = async (req,res,next)=>{
    try {
        const cart = await cart.findOne({user: req.user._id}).populate("items.product")
        if(!cart){
            const newCart = await cart.create({user: req.user._id, items : []})
            res.status(200).json({data:cart,message:"Cart is empty"})
        }
    } catch (error) {
        next(error)
    }
}

// add items to cart

export const addItem = async (req,res,next)=>{
    try {
        const {productId, quantity} = req.body
        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({message : "Product not Found"})
        }
        if(product.stockQuantity < quantity){
            return res.status(400).json({message: "Insufficient Stocks"})
        }
        const cart = await cart.findOne({user: req.user._id})
        if(!cart){
            const newCart = await cart.create({user: req.user._id, items : [{product:productId,quantity}]})
        }else{
            const existingItem = cart.items.find(item=>item.product.toString()=== productId)
        }
        if(existingItem){
            existingItem.quantity += quantity
        } else{
            cart.items.push({product : productId, quantity})
        }
        await cart.save()
        await cart.populate("items.product")
        res.status(200).json({message: "Added item successfully", data: cart})
    } catch (error) {
        next(error)
    }
}


// update cart items

export const updateItems = async (req,res,next)=>{
    try {
        const {quantity}= req.body
        const {productId} = req.params
        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({message: "Product Not Found"})
        }
        if (product.stockQuantity < quantity) {
            return res.status(400).json({  message: 'Insufficient stock' });
          }
          const cart = await cart.findOne({ user: req.user._id });
          if(!cart){
            return res.status(404).json({message: "Cart not Found"})
          }
          const cartItem = cart.items.find(items=>item.product.toString()===productId)
          if(!cartItem){
            return res.status(404).json({message:"Item not found in cart"})
          }
          cartItem.quantity = quantity;
          await cart.save()
          await cart.populate('items.product');
           return res.status(200).json({message: "Updated item successfully", data: cart})
    } catch (error) {
        next(error)
    }
}

// removing item 

export const removingItems = async (req,res,next)=>{
    try {
        const {productId} = req.params
        const cart = await cart.findOne({ user: req.user._id });
        if(!cart){
            return res.status(404).json({message:"Cart Not Found"})
        }
      cart.items =  cart.items.filter(items=>items.product.toString()!==productId)
        
    await cart.save();
    await cart.populate('items.product');

    res.json({ message:"Removed Successfully", data: cart });
    } catch (error) {
        next(error)
    }
}

