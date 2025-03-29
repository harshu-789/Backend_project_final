import express from "express"
import dotenv from "dotenv"
import cors from 'cors'
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js'
import cartRoutes from './routes/cart.routes.js'
import { errorHandler } from './middlewares/error.middleware.js';
import { authMiddleware } from './middlewares/auth.middleware.js';



dotenv.config()


const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', authRoutes);
app.use('./api/Product', productRoutes)
app.use('./api/cart', authMiddleware, cartRoutes)


app.use(errorHandler);



export default app