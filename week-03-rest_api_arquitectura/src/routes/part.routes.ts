import { Router, type IRouter } from 'express';
import * as partController from '../controllers/part.controller.js';

const router: IRouter = Router();

router.get('/', partController.getAll);
router.get('/:id', partController.getById);
router.post('/', partController.create);
router.put('/:id', partController.update);
router.delete('/:id', partController.remove);

export default router;
