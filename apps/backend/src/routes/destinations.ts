import { Router } from 'express';
import {
  getDestinations,
  getDestination,
  createDestination,
  updateDestination,
  deleteDestination,
} from '../controllers/destinationController';
import { authMiddleware, adminMiddleware } from '../middlewares/auth';

const router: Router = Router();

// Public routes
router.get('/', getDestinations);
router.get('/:id', getDestination);

// Protected routes (admin only)
router.post('/', authMiddleware, adminMiddleware, createDestination);
router.put('/:id', authMiddleware, adminMiddleware, updateDestination);
router.delete('/:id', authMiddleware, adminMiddleware, deleteDestination);

export default router;
