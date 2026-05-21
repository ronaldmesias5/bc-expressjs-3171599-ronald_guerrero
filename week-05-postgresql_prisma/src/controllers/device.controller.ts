import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js';
import * as deviceService from '../services/device.service.js';
import { deviceSchema, idSchema, partialDeviceSchema } from '../schemas/index.js';

export async function getAllDevices(_req: Request, res: Response, next: NextFunction) {
  try {
    const devices = await deviceService.findAll();
    return res.json(devices);
  } catch (error) {
    next(error);
  }
}

export async function getDeviceById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = idSchema.parse(req.params.id);
    const device = await deviceService.findById(id);
    return res.json(device);
  } catch (error) {
    next(error);
  }
}

export async function createDevice(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = deviceSchema.parse(req.body);
    const created = await deviceService.create(payload);
    return res.status(201).json(created);
  } catch (error) {
    next(error);
  }
}

export async function updateDevice(req: Request, res: Response, next: NextFunction) {
  try {
    const id = idSchema.parse(req.params.id);
    const payload = partialDeviceSchema.parse(req.body);
    if (Object.keys(payload).length === 0) {
      throw new AppError('Debe enviar al menos un campo para actualizar', 400);
    }

    const updated = await deviceService.update(id, payload);
    return res.json(updated);
  } catch (error) {
    next(error);
  }
}

export async function deleteDevice(req: Request, res: Response, next: NextFunction) {
  try {
    const id = idSchema.parse(req.params.id);
    await deviceService.remove(id);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}
