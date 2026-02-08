import { Router } from 'express';
import { adminLogin, userLogin, registerUser } from '../controllers/authController';

const router: Router = Router();

router.post('/admin-login', adminLogin);
router.post('/login', userLogin);
router.post('/register', registerUser);

export default router;
