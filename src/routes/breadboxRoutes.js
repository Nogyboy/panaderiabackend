import express from "express";
import {getAllBreadBoxes, createBreadBox, createBreadImage, getBreadBoxImages} from '../controllers/breadboxController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

import multer from "multer";

// Directory for images uploaded
const imageUpload = multer({
  dest: 'images/',
 });

// Routes for BreadBoxes functions
router.get('/all',checkAuth, getAllBreadBoxes);
router.post('/create',checkAuth, createBreadBox);
router.post('/image',checkAuth, imageUpload.single('image'), createBreadImage);
router.get('/image', getBreadBoxImages);


export default router;
