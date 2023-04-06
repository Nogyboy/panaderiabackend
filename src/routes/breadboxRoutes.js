import express from "express";
import {getAllBreadBoxes, createBreadBox, createBreadImage, getBreadBoxImages} from '../controllers/breadboxController.js';

const router = express.Router();

import multer from "multer";

const imageUpload = multer({
  dest: 'images/',
 });


router.get('/all', getAllBreadBoxes);
router.post('/create', createBreadBox);
router.post('/image', imageUpload.single('image'), createBreadImage);
router.get('/image', getBreadBoxImages);


export default router;
