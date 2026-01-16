import { Router } from 'express';
import { ProxyController } from '../controllers/proxy.controller';

const router = Router();

/**
 * POST /api/proxy
 * Execute a proxied HTTP request
 */
router.post('/proxy', ProxyController.executeRequest);

export default router;
