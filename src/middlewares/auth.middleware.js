import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'

const authMiddleware = async (err,req,res,next)=>{
    try {
        const token = req.headers.authorization?.split('')[1]
        if(!token){
            return res.status(401).json({message:'Unauthorized'})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const User = await User.findById(decoded.id)
        
    if (!User) {
        return res.status(401).json({ message: 'User not found' });
      }
  
      req.User = User;
      next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' })
    }
}

export {authMiddleware}