import express from "express";
import { createOrder, createOrderDetail, getAllOrders, getDetailsOrder } from '../controllers/orderController.js';
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

// Routes for Orders functions
router.post('/create',checkAuth, createOrder);
router.post('/detail',checkAuth, createOrderDetail);
router.get('/all',checkAuth, getAllOrders);
router.get('/details',checkAuth, getDetailsOrder);


export default router;
