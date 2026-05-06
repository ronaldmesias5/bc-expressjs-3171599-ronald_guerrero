import type { Request, Response, NextFunction } from 'express';
import * as deviceService from '../services/device.service.js';
import { DeviceStatus } from '../types/index.js';

const validStatuses: DeviceStatus[] = ["received", "diagnosing", "repairing", "completed", "delivered"];

export function getAll(req: Request, res: Response, next: NextFunction): void {
  try {
    const data = deviceService.getAll();
    res.status(200).json({
      success: true,
      data,
      total: data.length
    });
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
    const device = deviceService.getById(id);
    if (!device) {
      res.status(404).json({ success: false, error: `Device with id ${id} not found` });
      return;
    }
    res.status(200).json({ success: true, data: device });
  } catch (err) {
    next(err);
  }
}

export function create(req: Request, res: Response, next: NextFunction): void {
  try {
    const { brand, model, customerName, customerPhone, issue, status, estimatedCost } = req.body;
    const missing: string[] = [];
    if (!brand) missing.push('brand');
    if (!model) missing.push('model');
    if (!customerName) missing.push('customerName');
    if (!customerPhone) missing.push('customerPhone');
    if (!issue) missing.push('issue');
    if (!status) missing.push('status');
    if (estimatedCost === undefined) missing.push('estimatedCost');
    if (missing.length > 0) {
      res.status(400).json({ success: false, error: `Missing required fields: ${missing.join(', ')}` });
      return;
    }
    if (!validStatuses.includes(status)) {
      res.status(400).json({ success: false, error: `Invalid status. Allowed: ${validStatuses.join(', ')}` });
      return;
    }
    if (typeof estimatedCost !== 'number' || estimatedCost < 0) {
      res.status(400).json({ success: false, error: 'estimatedCost must be a positive number' });
      return;
    }
    const device = deviceService.create({
      brand, model, customerName, customerPhone, issue, status, estimatedCost,
      entryDate: new Date().toISOString()
    });
    res.status(201).json({ success: true, message: 'Device created', data: device });
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
    const device = deviceService.getById(id);
    if (!device) {
      res.status(404).json({ success: false, error: `Device with id ${id} not found` });
      return;
    }
    const data = req.body;
    if (data.status && !validStatuses.includes(data.status)) {
      res.status(400).json({ success: false, error: `Invalid status. Allowed: ${validStatuses.join(', ')}` });
      return;
    }
    const updated = deviceService.update(id, data);
    res.status(200).json({ success: true, message: 'Device updated', data: updated });
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
    const device = deviceService.getById(id);
    if (!device) {
      res.status(404).json({ success: false, error: `Device with id ${id} not found` });
      return;
    }
    deviceService.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
