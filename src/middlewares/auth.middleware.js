import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Correct token extraction
        console.log("Token:", token);

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT token
        const user = await User.findById(decoded.userId).select('-password'); // Get user, exclude password

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user; // Attach user to request
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export { authMiddleware };
