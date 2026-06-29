import { Request, Response, NextFunction } from 'express';
import * as deviceService from '../services/device.service';
import { createDeviceSchema, updateDeviceSchema } from '../schemas/device.schema';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const devices = await deviceService.getAll();
    res.json(devices);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params['id'] as string;
    const device = await deviceService.getById(id);
    res.json(device);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = createDeviceSchema.parse(req.body);
    const userId = req.user!.sub;
    const device = await deviceService.create(dto, userId);
    res.status(201).json(device);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params['id'] as string;
    const dto = updateDeviceSchema.parse(req.body);
    const device = await deviceService.update(id, dto);
    res.json(device);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params['id'] as string;
    await deviceService.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
