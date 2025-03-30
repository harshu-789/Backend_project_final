import express from 'express';
import {
  getUserCart,
  addItem,
  updateItems,
  removingItems
} from '../controllers/cart.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('',authMiddleware, getUserCart);
router.post('/add', authMiddleware,addItem);
router.put('/update/:productId', authMiddleware,updateItems);
router.delete('/delete/:productId', authMiddleware, removingItems);

export default router;
