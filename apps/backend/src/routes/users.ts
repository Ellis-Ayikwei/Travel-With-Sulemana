import { Router } from 'express';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController';
import { authMiddleware, adminMiddleware } from '../middlewares/auth';

const router: Router = Router();

// Public route
router.get('/', authMiddleware, adminMiddleware, getUsers);

// Protected routes
router.post('/', createUser);
router.get('/:id', authMiddleware, getUser);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, adminMiddleware, deleteUser);

export default router;
