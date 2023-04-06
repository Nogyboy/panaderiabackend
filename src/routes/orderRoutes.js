import express from "express";
import { createOrder, createOrderDetail } from '../controllers/orderController.js';

const router = express.Router();


router.post('/create', createOrder);
router.post('/detail', createOrderDetail);



export default router;
