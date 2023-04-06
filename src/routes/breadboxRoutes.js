// Import required modules
import express from "express";
import {getAllBreadBoxes, createBreadBox, createBreadImage, getBreadBoxImages} from '../controllers/breadboxController.js';

// Create a new router instance
const router = express.Router();

import multer from "multer";

const imageUpload = multer({
  dest: 'images/',
 });

// Create routes for comments
// router.post('/comments', checkAuth, createComment);
// router.put('/comments/:id', checkAuth, updateComment);
// router.delete('/comments/:id', checkAuth, deleteComment);
// router.get('/comments/:id', getComment);
router.get('/all', getAllBreadBoxes);
router.post('/create', createBreadBox);
router.post('/image', imageUpload.single('image'), createBreadImage);
router.get('/image', getBreadBoxImages);

// Export the router
export default router;
