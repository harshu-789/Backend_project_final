import express from "express"
import dotenv from "dotenv"
import cors from 'cors'
import bodyParser from "body-parser"
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js'
import cartRoutes from './routes/cart.routes.js'
import { errorHandler } from './middlewares/error.middleware.js';
import { authMiddleware } from './middlewares/auth.middleware.js';



dotenv.config()


const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Enable form data parsing


app.use('/api/auth',authRoutes);
app.use('/api/product', productRoutes)
app.use('/api/cart',cartRoutes)


app.use(errorHandler);




export default app