import type { Request, Response, NextFunction } from 'express';
import * as partService from '../services/part.service.js';
import { PartCategory } from '../types/index.js';

const validCategories: PartCategory[] = [
  "display", "battery", "charging_port", "camera", "speaker",
  "microphone", "back_cover", "logic_board", "other"
];

export function getAll(req: Request, res: Response, next: NextFunction): void {
  try {
    const data = partService.getAll();
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
    const part = partService.getById(id);
    if (!part) {
      res.status(404).json({ success: false, error: `Part with id ${id} not found` });
      return;
    }
    res.status(200).json({ success: true, data: part });
  } catch (err) {
    next(err);
  }
}

export function create(req: Request, res: Response, next: NextFunction): void {
  try {
    const { name, category, price, stock, compatibleBrands, supplier } = req.body;
    const missing: string[] = [];
    if (!name) missing.push('name');
    if (!category) missing.push('category');
    if (price === undefined) missing.push('price');
    if (stock === undefined) missing.push('stock');
    if (!compatibleBrands) missing.push('compatibleBrands');
    if (missing.length > 0) {
      res.status(400).json({ success: false, error: `Missing required fields: ${missing.join(', ')}` });
      return;
    }
    if (!validCategories.includes(category)) {
      res.status(400).json({ success: false, error: `Invalid category. Allowed: ${validCategories.join(', ')}` });
      return;
    }
    if (typeof price !== 'number' || price < 0) {
      res.status(400).json({ success: false, error: 'price must be a positive number' });
      return;
    }
    if (!Number.isInteger(stock) || stock < 0) {
      res.status(400).json({ success: false, error: 'stock must be a non-negative integer' });
      return;
    }
    if (!Array.isArray(compatibleBrands) || compatibleBrands.length === 0) {
      res.status(400).json({ success: false, error: 'compatibleBrands must be a non-empty array' });
      return;
    }
    const part = partService.create({ name, category, price, stock, compatibleBrands, supplier });
    res.status(201).json({ success: true, message: 'Part created', data: part });
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
    const part = partService.getById(id);
    if (!part) {
      res.status(404).json({ success: false, error: `Part with id ${id} not found` });
      return;
    }
    const data = req.body;
    if (data.category && !validCategories.includes(data.category)) {
      res.status(400).json({ success: false, error: `Invalid category. Allowed: ${validCategories.join(', ')}` });
      return;
    }
    const updated = partService.update(id, data);
    res.status(200).json({ success: true, message: 'Part updated', data: updated });
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
    const part = partService.getById(id);
    if (!part) {
      res.status(404).json({ success: false, error: `Part with id ${id} not found` });
      return;
    }
    partService.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
