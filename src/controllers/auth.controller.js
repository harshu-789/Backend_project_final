import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; // Import bcrypt
import { User } from "../models/user.model.js";

// Registering User
const registerUser = async (req, res, next) => {
    try {
        console.log("Received data:", req.body);

        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            console.log("Missing fields");
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExist = await User.findOne({ $or: [{ email }, { userName }] });
        if (userExist) {
            console.log("User already exists:", userExist);
            return res.status(400).json({ message: "User already exists" });
        }
        console.log("Creating user...");

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Entered Password:", hashedPassword);

        const newUser = new User({ userName, email, password });
        await newUser.save();
        console.log("User created:", newUser);

        const token = jwt.sign({ userId: newUser.User_id }, process.env.JWT_SECRET, { expiresIn: "24h" });
        res.status(201).json({ message: "User registered successfully", token });

    } catch (error) {
        console.error("Error during registration:", error);
        next(error);
    }
};


// Login User
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log("logged data" , req.body)

        // Find user by email
        const existingUser = await User.findOne({ email });
        console.log("existing user", existingUser)

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        
        if (!password || !existingUser.password) {
            return res.status(400).json({ message: "Password or hash missing" });
        }
        
        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        console.log("Password Match:", isPasswordValid);
        
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate JWT token
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
