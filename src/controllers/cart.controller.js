import { Product } from "../models/product.model.js";
import { Cart } from "../models/cart.model.js";

// Get user cart
export const getUserCart = async (req, res, next) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
        if (!cart) {
            cart = await Cart.create({ user: req.user._id, items: [] });
            return res.status(200).json({ data: cart, message: "Cart is empty" });
        }
        res.status(200).json({ data: cart });
    } catch (error) {
        next(error);
    }
};

// Add items to cart
export const addItem = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (product.stockQuantity < quantity) {
            return res.status(400).json({ message: "Insufficient stock" });
        }

        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            cart = await Cart.create({ user: req.user._id, items: [{ product: productId, quantity }] });
        } else {
            const existingItem = cart.items.find(item => item.product.toString() === productId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ product: productId, quantity });
            }
        }

        await cart.save();
        await cart.populate("items.product");
        res.status(200).json({ message: "Added item successfully", data: cart });
    } catch (error) {
        next(error);
    }
};

// Update cart items
export const updateItems = async (req, res, next) => {
    try {
        const { quantity } = req.body;
        const { productId } = req.params;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (product.stockQuantity < quantity) {
            return res.status(400).json({ message: "Insufficient stock" });
        }

        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const cartItem = cart.items.find(item => item.product.toString() === productId);
        if (!cartItem) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        cartItem.quantity = quantity;
        await cart.save();
        await cart.populate("items.product");
        res.status(200).json({ message: "Updated item successfully", data: cart });
    } catch (error) {
        next(error);
    }
};

// Remove item from cart
export const removingItems = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        await cart.save();
        await cart.populate("items.product");

        res.status(200).json({ message: "Removed successfully", data: cart });
    } catch (error) {
        next(error);
    }
};
