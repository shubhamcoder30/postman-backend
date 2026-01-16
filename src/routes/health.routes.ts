import { Router } from 'express';
import { HealthController } from '../controllers/health.controller';

const router = Router();

/**
 * GET /api/health
 * Health check endpoint
 */
router.get('/health', HealthController.check);

export default router;
