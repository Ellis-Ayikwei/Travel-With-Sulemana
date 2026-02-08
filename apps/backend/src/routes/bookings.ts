import { Router } from 'express';
import {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
} from '../controllers/bookingController';
import { authMiddleware, adminMiddleware } from '../middlewares/auth';

const router: Router = Router();

// Public routes
router.get('/', getBookings);
router.post('/', createBooking);

// Protected routes
router.get('/:id', authMiddleware, getBooking);
router.put('/:id', authMiddleware, adminMiddleware, updateBooking);
router.delete('/:id', authMiddleware, adminMiddleware, deleteBooking);

export default router;
