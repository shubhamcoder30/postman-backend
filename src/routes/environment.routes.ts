import { Router } from 'express';
import { EnvironmentController } from '../controllers/environment.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/', EnvironmentController.create);
router.get('/', EnvironmentController.getAll);
router.patch('/:id', EnvironmentController.update);
router.put('/:id', EnvironmentController.update);
router.delete('/:id', EnvironmentController.delete);

export default router;
