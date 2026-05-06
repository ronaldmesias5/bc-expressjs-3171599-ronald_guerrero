import { Router, type IRouter } from 'express';
import * as customerController from '../controllers/customer.controller.js';

const router: IRouter = Router();

router.get('/', customerController.getAll);
router.get('/:id', customerController.getById);
router.post('/', customerController.create);
router.put('/:id', customerController.update);
router.delete('/:id', customerController.remove);

export default router;
