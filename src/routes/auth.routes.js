import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/registerUser', registerUser);
router.post('/loginUser', loginUser);

export default router;
