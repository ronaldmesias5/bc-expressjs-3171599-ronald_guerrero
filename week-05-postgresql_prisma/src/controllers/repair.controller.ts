import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js';
import * as repairService from '../services/repair.service.js';
import { idSchema, partialRepairSchema, repairSchema } from '../schemas/index.js';

export async function getAllRepairs(_req: Request, res: Response, next: NextFunction) {
  try {
    const repairs = await repairService.findAll();
    return res.json(repairs);
  } catch (error) {
    next(error);
  }
}

export async function getRepairById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = idSchema.parse(req.params.id);
    const repair = await repairService.findById(id);
    return res.json(repair);
  } catch (error) {
    next(error);
  }
}

export async function createRepair(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = repairSchema.parse(req.body);
    const { deviceId, ...payloadWithoutDeviceId } = payload;
    const created = await repairService.create({
      ...payloadWithoutDeviceId,
      device: { connect: { id: deviceId } },
    });
    return res.status(201).json(created);
  } catch (error) {
    next(error);
  }
}

export async function updateRepair(req: Request, res: Response, next: NextFunction) {
  try {
    const id = idSchema.parse(req.params.id);
    const payload = partialRepairSchema.parse(req.body);
    if (Object.keys(payload).length === 0) {
      throw new AppError('Debe enviar al menos un campo para actualizar', 400);
    }
    const updated = await repairService.update(id, payload);
    return res.json(updated);
  } catch (error) {
    next(error);
  }
}

export async function deleteRepair(req: Request, res: Response, next: NextFunction) {
  try {
    const id = idSchema.parse(req.params.id);
    await repairService.remove(id);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}
