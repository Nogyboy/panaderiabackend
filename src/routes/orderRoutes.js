import express from "express";
import { createOrder, createOrderDetail, getAllOrders, getDetailsOrder } from '../controllers/orderController.js';

const router = express.Router();


router.post('/create', createOrder);
router.post('/detail', createOrderDetail);
router.get('/all', getAllOrders);
router.get('/details', getDetailsOrder);


export default router;
