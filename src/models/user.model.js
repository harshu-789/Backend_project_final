import mongoose from "mongoose";
import bcrypt, { hash } from "bcryptjs";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique : true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
      },
      password: {
        type: String,
        required: true
      }
}, {timestamps: true})

// Hash password before saving

userSchema.pre("save",async function(next) {
    if(!this.isModified("password")) 
        return next()
    this.password = await bcrypt.hash(this.password,10)
    next()   
})


// Comparing password

userSchema.methods.comparePassword = async function(userPassword) {
    return await bcrypt.compare(userPassword,this.password)
}

export const User =  mongoose.model("User",userSchema)