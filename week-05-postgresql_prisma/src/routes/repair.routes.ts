import { Router } from 'express';
import {
  createRepair,
  deleteRepair,
  getAllRepairs,
  getRepairById,
  updateRepair,
} from '../controllers/repair.controller.js';

const router = Router();

router.get('/', getAllRepairs);
router.get('/:id', getRepairById);
router.post('/', createRepair);
router.put('/:id', updateRepair);
router.delete('/:id', deleteRepair);

export default router;
