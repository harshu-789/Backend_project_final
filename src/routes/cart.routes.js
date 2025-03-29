import express from 'express';
import {
  getUserCart,
  addItem,
  updateItems,
  removingItems
} from '../controllers/cart.controller.js';

const router = express.Router();

router.get('/', getUserCart);
router.post('/', addItem);
router.put('/:productId', updateItems);
router.delete('/:productId', removingItems);

export default router;
