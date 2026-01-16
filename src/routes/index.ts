import { Router } from 'express';
import healthRoutes from './health.routes';
import proxyRoutes from './proxy.routes';
import authRoutes from './auth.routes';

import collectionRoutes from './collection.routes';
import requestRoutes from './request.routes';
import environmentRoutes from './environment.routes';

const router = Router();

// Mount routes
router.use('/', healthRoutes);
router.use('/', proxyRoutes);
router.use('/auth', authRoutes);
router.use('/collections', collectionRoutes);
router.use('/requests', requestRoutes);
router.use('/environments', environmentRoutes);

export default router;

