import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js';

export default function notFound(_req: Request, _res: Response, next: NextFunction) {
  next(new AppError('Ruta no encontrada', 404));
}
