import express from "express";
import { createOrder } from '../controllers/orderController';

const router = express.Router();


router.post('/create', createOrder);


export default router;
