import { Request, Response, NextFunction } from 'express';
import * as service from '../services/customer.service';
import {
  createCustomerSchema,
  updateCustomerSchema,
} from '../schemas/customer.schema';
import { objectIdSchema } from '../schemas/device.schema';

export async function getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const customers = await service.getAll();
    res.json(customers);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = objectIdSchema.parse(req.params['id']);
    const customer = await service.getById(id);
    res.json(customer);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = createCustomerSchema.parse(req.body);
    const customer = await service.createCustomer(dto);
    res.status(201).json(customer);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id  = objectIdSchema.parse(req.params['id']);
    const dto = updateCustomerSchema.parse(req.body);
    const customer = await service.updateCustomer(id, dto);
    res.json(customer);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = objectIdSchema.parse(req.params['id']);
    await service.deleteCustomer(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
