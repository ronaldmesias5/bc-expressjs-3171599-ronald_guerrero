// ============================================
// MIDDLEWARES — Error handler global (4 params)
// ============================================
import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/AppError.js';
import { logger } from '../config/logger.js';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Caso 1: ZodError → 400
  if (err instanceof ZodError) {
    const issues = err.issues.map((issue) => ({
      field: issue.path.join('.') || 'id',
      message: issue.message,
    }));
    res.status(400).json({
      error: 'Validation Error',
      message: 'Los datos enviados no son válidos',
      issues,
    });
    return;
  }

  // Caso 2: AppError → statusCode específico
  if (err instanceof AppError) {
    logger.warn(`[${err.statusCode}] ${err.message}`);
    res.status(err.statusCode).json({
      error: 'Application Error',
      message: err.message,
    });
    return;
  }

  // Caso 3: Error inesperado → 500
  const isProduction = process.env['NODE_ENV'] === 'production';
  logger.error(`Error no manejado: ${err instanceof Error ? err.message : String(err)}`);

  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Ocurrió un error inesperado',
    ...(isProduction ? {} : { detail: err instanceof Error ? err.message : String(err) }),
  });
}
