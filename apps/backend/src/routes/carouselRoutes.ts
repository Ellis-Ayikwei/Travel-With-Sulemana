import { Router } from 'express';
import {
  getCarouselImages,
  getAllCarouselImages,
  createCarouselImage,
  updateCarouselImage,
  deleteCarouselImage,
  reorderCarouselImages,
} from '../controllers/carouselController';
import { authMiddleware, adminMiddleware } from '../middlewares/auth';
import { upload } from '../utils/upload';

const router: Router = Router();

// Public route: Get active carousel images
router.get('/', getCarouselImages);

// Admin routes
router.get('/admin/all', authMiddleware, adminMiddleware, getAllCarouselImages);
router.post('/admin', authMiddleware, adminMiddleware, createCarouselImage);
router.post('/admin/upload', authMiddleware, adminMiddleware, upload.single('image'), createCarouselImage);
router.put('/admin/:id', authMiddleware, adminMiddleware, updateCarouselImage);
router.delete('/admin/:id', authMiddleware, adminMiddleware, deleteCarouselImage);
router.post('/admin/reorder', authMiddleware, adminMiddleware, reorderCarouselImages);

export default router;
