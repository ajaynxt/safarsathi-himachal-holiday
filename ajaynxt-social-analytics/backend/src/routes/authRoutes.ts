import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// 1. Backend Login
router.post('/login', AuthController.login);

// 2. Backend Signup
router.post('/signup', AuthController.signup);

// 3. Google Sign-in sync
router.post('/google', AuthController.googleAuth);

// 4. Facebook Sign-in / connect
router.post('/facebook', AuthController.facebookAuth);

// 5. Instagram Sign-in / connect
router.post('/instagram', AuthController.instagramAuth);

// 6. Get Current User Profile (session check)
router.get('/me', authenticateToken, AuthController.me);

// 7. Billing & Datastore info (rider4xr)
router.get('/billing', AuthController.getBillingStatus);

export default router;
