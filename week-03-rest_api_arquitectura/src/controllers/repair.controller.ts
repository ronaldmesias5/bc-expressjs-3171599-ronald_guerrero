import type { Request, Response, NextFunction } from 'express';
import * as repairService from '../services/repair.service.js';
import { RepairStatus } from '../types/index.js';

const validStatuses: RepairStatus[] = ["pending", "in_progress", "completed", "cancelled"];

export function getAll(req: Request, res: Response, next: NextFunction): void {
  try {
    const data = repairService.getAll();
    res.status(200).json({ success: true, data, total: data.length });
  } catch (err) {
    next(err);
  }
}

export function getById(req: Request, res: Response, next: NextFunction): void {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      res.status(400).json({ success: false, error: 'ID must be a number' });
      return;
    }
    const repair = repairService.getById(id);
    if (!repair) {
      res.status(404).json({ success: false, error: `Repair with id ${id} not found` });
      return;
    }
    res.status(200).json({ success: true, data: repair });
  } catch (err) {
    next(err);
  }
}

export function create(req: Request, res: Response, next: NextFunction): void {
  try {
    const { deviceId, description, technician, status, startDate, estimatedEndDate, cost } = req.body;
    const missing: string[] = [];
    if (deviceId === undefined) missing.push('deviceId');
    if (!description) missing.push('description');
    if (!technician) missing.push('technician');
    if (!status) missing.push('status');
    if (!startDate) missing.push('startDate');
    if (!estimatedEndDate) missing.push('estimatedEndDate');
    if (cost === undefined) missing.push('cost');
    if (missing.length > 0) {
      res.status(400).json({ success: false, error: `Missing required fields: ${missing.join(', ')}` });
      return;
    }
    if (!validStatuses.includes(status)) {
      res.status(400).json({ success: false, error: `Invalid status. Allowed: ${validStatuses.join(', ')}` });
      return;
    }
    if (typeof cost !== 'number' || cost < 0) {
      res.status(400).json({ success: false, error: 'cost must be a positive number' });
      return;
    }
    const repair = repairService.create({ deviceId, description, technician, status, startDate, estimatedEndDate, cost });
    res.status(201).json({ success: true, message: 'Repair created', data: repair });
  } catch (err) {
    next(err);
  }
}

export function update(req: Request, res: Response, next: NextFunction): void {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      res.status(400).json({ success: false, error: 'ID must be a number' });
      return;
    }
    const repair = repairService.getById(id);
    if (!repair) {
      res.status(404).json({ success: false, error: `Repair with id ${id} not found` });
      return;
    }
    const data = req.body;
    if (data.status && !validStatuses.includes(data.status)) {
      res.status(400).json({ success: false, error: `Invalid status. Allowed: ${validStatuses.join(', ')}` });
      return;
    }
    const updated = repairService.update(id, data);
    res.status(200).json({ success: true, message: 'Repair updated', data: updated });
  } catch (err) {
    next(err);
  }
}

export function remove(req: Request, res: Response, next: NextFunction): void {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      res.status(400).json({ success: false, error: 'ID must be a number' });
      return;
    }
    const repair = repairService.getById(id);
    if (!repair) {
      res.status(404).json({ success: false, error: `Repair with id ${id} not found` });
      return;
    }
    repairService.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
