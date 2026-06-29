import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/AppError';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  if (err instanceof ZodError) {
    const message = err.issues[0]?.message ?? 'Datos inválidos';
    res.status(400).json({ message });
    return;
  }

  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
}
