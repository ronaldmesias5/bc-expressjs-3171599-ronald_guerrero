import { Router } from 'express';
import * as deviceController from '../controllers/device.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Todas las rutas de este router requieren autenticación
router.use(authMiddleware);

router.get('/',       deviceController.getAll);
router.get('/:id',    deviceController.getById);
router.post('/',      deviceController.create);
router.patch('/:id',  deviceController.update);
router.delete('/:id', deviceController.remove);

export default router;
