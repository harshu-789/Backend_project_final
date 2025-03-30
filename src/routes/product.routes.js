import express from 'express';
import { getAllProducts, getProductByID, createProduct } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductByID);
router.post('/', createProduct);


export default router;
