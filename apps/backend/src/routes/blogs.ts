import { Router } from 'express';
import {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from '../controllers/blogController';
import { authMiddleware, adminMiddleware } from '../middlewares/auth';

const router: Router = Router();

// Public routes
router.get('/', getBlogPosts);
router.get('/:id', getBlogPost);

// Protected routes (admin only)
router.post('/', authMiddleware, adminMiddleware, createBlogPost);
router.put('/:id', authMiddleware, adminMiddleware, updateBlogPost);
router.delete('/:id', authMiddleware, adminMiddleware, deleteBlogPost);

export default router;
