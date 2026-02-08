import { Router } from 'express';
import {
  getPackages,
  getPackage,
  createPackage,
  updatePackage,
  deletePackage,
} from '../controllers/packageController';
import { authMiddleware, adminMiddleware } from '../middlewares/auth';

const router: Router = Router();

// Public routes
router.get('/', getPackages);
router.get('/:id', getPackage);

// Protected routes (admin only)
router.post('/', authMiddleware, adminMiddleware, createPackage);
router.put('/:id', authMiddleware, adminMiddleware, updatePackage);
router.delete('/:id', authMiddleware, adminMiddleware, deletePackage);

export default router;
