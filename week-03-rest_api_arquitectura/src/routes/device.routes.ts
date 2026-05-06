import { Router, type IRouter } from 'express';
import * as deviceController from '../controllers/device.controller.js';

const router: IRouter = Router();

router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getById);
router.post('/', deviceController.create);
router.put('/:id', deviceController.update);
router.delete('/:id', deviceController.remove);

export default router;
