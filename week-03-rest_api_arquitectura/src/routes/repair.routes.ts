import { Router, type IRouter } from 'express';
import * as repairController from '../controllers/repair.controller.js';

const router: IRouter = Router();

router.get('/', repairController.getAll);
router.get('/:id', repairController.getById);
router.post('/', repairController.create);
router.put('/:id', repairController.update);
router.delete('/:id', repairController.remove);

export default router;
