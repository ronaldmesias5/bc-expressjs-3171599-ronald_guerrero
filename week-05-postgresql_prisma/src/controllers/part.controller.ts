import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js';
import * as partService from '../services/part.service.js';
import { idSchema, partialPartSchema, partSchema } from '../schemas/index.js';

export async function getAllParts(_req: Request, res: Response, next: NextFunction) {
  try {
    const parts = await partService.findAll();
    return res.json(parts);
  } catch (error) {
    next(error);
  }
}

export async function getPartById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = idSchema.parse(req.params.id);
    const part = await partService.findById(id);
    return res.json(part);
  } catch (error) {
    next(error);
  }
}

export async function createPart(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = partSchema.parse(req.body);
    const created = await partService.create(payload);
    return res.status(201).json(created);
  } catch (error) {
    next(error);
  }
}

export async function updatePart(req: Request, res: Response, next: NextFunction) {
  try {
    const id = idSchema.parse(req.params.id);
    const payload = partialPartSchema.parse(req.body);
    if (Object.keys(payload).length === 0) {
      throw new AppError('Debe enviar al menos un campo para actualizar', 400);
    }
    const updated = await partService.update(id, payload);
    return res.json(updated);
  } catch (error) {
    next(error);
  }
}

export async function deletePart(req: Request, res: Response, next: NextFunction) {
  try {
    const id = idSchema.parse(req.params.id);
    await partService.remove(id);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}
