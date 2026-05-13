// ============================================
// MIDDLEWARES — 404 handler (rutas no existentes)
// ============================================
import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js';

export function notFound(req: Request, _res: Response, next: NextFunction): void {
  next(new AppError(404, `Ruta ${req.method} ${req.path} no encontrada`));
}
