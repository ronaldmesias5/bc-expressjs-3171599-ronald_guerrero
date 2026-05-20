import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js';
import * as customerService from '../services/customer.service.js';
import { customerSchema, idSchema, partialCustomerSchema } from '../schemas/index.js';

export async function getAllCustomers(_req: Request, res: Response, next: NextFunction) {
  try {
    const customers = await customerService.findAll();
    return res.json(customers);
  } catch (error) {
    next(error);
  }
}

export async function getCustomerById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = idSchema.parse(req.params.id);
    const customer = await customerService.findById(id);
    return res.json(customer);
  } catch (error) {
    next(error);
  }
}

export async function createCustomer(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = customerSchema.parse(req.body);
    const created = await customerService.create(payload);
    return res.status(201).json(created);
  } catch (error) {
    next(error);
  }
}

export async function updateCustomer(req: Request, res: Response, next: NextFunction) {
  try {
    const id = idSchema.parse(req.params.id);
    const payload = partialCustomerSchema.parse(req.body);
    if (Object.keys(payload).length === 0) {
      throw new AppError('Debe enviar al menos un campo para actualizar', 400);
    }

    const updated = await customerService.update(id, payload);
    return res.json(updated);
  } catch (error) {
    next(error);
  }
}

export async function deleteCustomer(req: Request, res: Response, next: NextFunction) {
  try {
    const id = idSchema.parse(req.params.id);
    await customerService.remove(id);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}
