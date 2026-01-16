import { Router } from 'express';
import { RequestController } from '../controllers/request.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/', RequestController.create);
router.get('/', RequestController.getAll);
router.get('/:id', RequestController.getOne);
router.patch('/:id', RequestController.update);
router.put('/:id', RequestController.update);
router.delete('/:id', RequestController.delete);

export default router;
