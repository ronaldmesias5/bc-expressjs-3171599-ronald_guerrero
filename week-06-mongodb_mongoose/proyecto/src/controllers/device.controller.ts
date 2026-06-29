import { Request, Response, NextFunction } from 'express';
import * as service from '../services/device.service';
import {
  createDeviceSchema,
  updateDeviceSchema,
  objectIdSchema,
} from '../schemas/device.schema';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page  = Number(req.query['page'])  || 1;
    const limit = Number(req.query['limit']) || 10;
    const search = req.query['search'] as string | undefined;
    const result = await service.getAll(page, limit, search);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = objectIdSchema.parse(req.params['id']);
    const device = await service.getById(id);
    res.json(device);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = createDeviceSchema.parse(req.body);
    const device = await service.createDevice(dto);
    res.status(201).json(device);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id  = objectIdSchema.parse(req.params['id']);
    const dto = updateDeviceSchema.parse(req.body);
    const device = await service.updateDevice(id, dto);
    res.json(device);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = objectIdSchema.parse(req.params['id']);
    await service.deleteDevice(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
