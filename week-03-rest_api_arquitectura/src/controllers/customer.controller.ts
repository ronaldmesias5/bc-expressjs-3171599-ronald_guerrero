import type { Request, Response, NextFunction } from 'express';
import * as customerService from '../services/customer.service.js';

export function getAll(req: Request, res: Response, next: NextFunction): void {
  try {
    const data = customerService.getAll();
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
    const customer = customerService.getById(id);
    if (!customer) {
      res.status(404).json({ success: false, error: `Customer with id ${id} not found` });
      return;
    }
    res.status(200).json({ success: true, data: customer });
  } catch (err) {
    next(err);
  }
}

export function create(req: Request, res: Response, next: NextFunction): void {
  try {
    const { name, phone, email, address } = req.body;
    const missing: string[] = [];
    if (!name) missing.push('name');
    if (!phone) missing.push('phone');
    if (missing.length > 0) {
      res.status(400).json({ success: false, error: `Missing required fields: ${missing.join(', ')}` });
      return;
    }
    if (typeof phone !== 'string' || phone.length < 7) {
      res.status(400).json({ success: false, error: 'phone must be at least 7 characters' });
      return;
    }
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({ success: false, error: 'Invalid email format' });
        return;
      }
    }
    const customer = customerService.create({ name, phone, email, address });
    res.status(201).json({ success: true, message: 'Customer created', data: customer });
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
    const customer = customerService.getById(id);
    if (!customer) {
      res.status(404).json({ success: false, error: `Customer with id ${id} not found` });
      return;
    }
    const data = req.body;
    if (data.phone && (typeof data.phone !== 'string' || data.phone.length < 7)) {
      res.status(400).json({ success: false, error: 'phone must be at least 7 characters' });
      return;
    }
    if (data.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        res.status(400).json({ success: false, error: 'Invalid email format' });
        return;
      }
    }
    const updated = customerService.update(id, data);
    res.status(200).json({ success: true, message: 'Customer updated', data: updated });
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
    const customer = customerService.getById(id);
    if (!customer) {
      res.status(404).json({ success: false, error: `Customer with id ${id} not found` });
      return;
    }
    customerService.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
