import { Router } from 'express';
import {
  getExperiences,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} from '../controllers/experienceController';
import { authMiddleware, adminMiddleware } from '../middlewares/auth';

const router: Router = Router();

// Public routes
router.get('/', getExperiences);
router.get('/:id', getExperience);

// Protected routes (admin only)
router.post('/', authMiddleware, adminMiddleware, createExperience);
router.put('/:id', authMiddleware, adminMiddleware, updateExperience);
router.delete('/:id', authMiddleware, adminMiddleware, deleteExperience);

export default router;
