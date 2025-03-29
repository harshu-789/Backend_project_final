import mongoose from "mongoose";
import dotenv from "dotenv"

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`\n MongoDB connected !!`)
    } catch (error) {
        console.error("MONGODB connection FAILED", error);
        process.exit(1);
    }
}
export default connectDB