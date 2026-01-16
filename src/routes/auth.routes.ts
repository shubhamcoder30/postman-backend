import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

/**
 * POST /api/auth/signup
 * Register a new user
 */
router.post('/signup', AuthController.signup);

/**
 * POST /api/auth/login
 * Login user
 */
router.post('/login', AuthController.login);

/**
 * POST /api/auth/logout
 * Logout user (protected route)
 */
router.post('/logout', authMiddleware, (req, res) => {
    res.json({
        success: true,
        statusCode: 200,
        message: 'Logout successful',
        data: null,
    });
});

/**
 * POST /api/auth/forgot-password
 * Request password reset
 */
router.post('/forgot-password', AuthController.forgotPassword);

/**
 * POST /api/auth/reset-password
 * Reset password with token
 */
router.post('/reset-password', AuthController.resetPassword);

export default router;
