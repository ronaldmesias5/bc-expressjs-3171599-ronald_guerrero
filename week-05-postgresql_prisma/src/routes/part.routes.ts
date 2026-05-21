import { Router } from 'express';
import {
  createPart,
  deletePart,
  getAllParts,
  getPartById,
  updatePart,
} from '../controllers/part.controller.js';

const router = Router();

router.get('/', getAllParts);
router.get('/:id', getPartById);
router.post('/', createPart);
router.put('/:id', updatePart);
router.delete('/:id', deletePart);

export default router;
