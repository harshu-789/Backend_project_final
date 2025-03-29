import express from 'express';
import { getAllProducts, getProductByID, createProduct } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/api', getAllProducts);
router.get('/api/:id', getProductByID);
router.post('/', createProduct);


export default router;
