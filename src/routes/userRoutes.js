import express from "express";
import { createUser, authenticateUser } from '../controllers/userController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

// Routes for Users functions
router.post('/create',checkAuth, createUser);
router.post('/login', authenticateUser);

export default router;
