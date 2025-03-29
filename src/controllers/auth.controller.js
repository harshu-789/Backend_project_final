import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// Registering User
const registerUser = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body;

        const userExist = await User.findOne({
            $or: [{ email }, { userName }]
        });

        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = await User.create({ userName, email, password });

        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(201).json({
            message: "User registered successfully",
            token
        });
    } catch (error) {
        next(error);
    }
};

// Login User
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await existingUser.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { userId: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.json({
            message: "Login successful",
            token
        });
    } catch (error) {
        next(error);
    }
};

export { registerUser, loginUser };
