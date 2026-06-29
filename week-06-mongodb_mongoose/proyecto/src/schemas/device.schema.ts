import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const objectIdSchema = z.string().regex(objectIdRegex, 'ID inválido');

export const createDeviceSchema = z.object({
  brand:         z.string().min(1, 'La marca es requerida').max(100),
  model:         z.string().min(1, 'El modelo es requerido').max(100),
  issue:         z.string().min(5, 'Describa el problema con al menos 5 caracteres').max(500),
  status:        z.enum(['PENDING', 'IN_REPAIR', 'COMPLETED', 'DELIVERED']).optional(),
  estimatedCost: z.number().min(0).optional(),
  finalCost:     z.number().min(0).optional(),
  customer:      z.string().regex(objectIdRegex, 'ID de cliente inválido'),
  entryDate:     z.string().datetime().optional(),
  exitDate:      z.string().datetime().optional(),
});

export const updateDeviceSchema = createDeviceSchema.partial();

export type CreateDeviceDto = z.infer<typeof createDeviceSchema>;
export type UpdateDeviceDto = z.infer<typeof updateDeviceSchema>;
