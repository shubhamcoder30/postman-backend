import { Router } from 'express';
import { ProxyController } from '../controllers/proxy.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

/**
 * POST /api/proxy
 * Execute a proxied HTTP request
 */
router.post('/proxy', authMiddleware, ProxyController.executeRequest);

export default router;
