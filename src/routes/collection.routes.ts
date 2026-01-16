import { Router } from 'express';
import { CollectionController } from '../controllers/collection.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/', CollectionController.create);
router.get('/', CollectionController.getAll);
router.patch('/:id', CollectionController.update);
router.put('/:id', CollectionController.update);
router.delete('/:id', CollectionController.delete);

export default router;
