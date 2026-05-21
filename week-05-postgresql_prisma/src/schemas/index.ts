import { z } from 'zod';

export const idSchema = z.coerce.number().int().positive();

export const customerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(7),
  address: z.string().optional(),
});

export const deviceSchema = z.object({
  brand: z.string().min(2),
  model: z.string().min(1),
  customerName: z.string().min(3),
  customerPhone: z.string().min(7),
  issue: z.string().min(5),
  status: z.enum(['PENDING', 'IN_REPAIR', 'COMPLETED', 'DELIVERED']).optional(),
  estimatedCost: z.number().nonnegative().optional(),
  finalCost: z.number().nonnegative().optional(),
  entryDate: z.string().datetime().optional(),
  exitDate: z.string().datetime().optional(),
});

export const partSchema = z.object({
  name: z.string().min(3),
  category: z.enum(['ELECTRICAL', 'MECHANICAL', 'GENERAL']),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative(),
  compatibleBrands: z.array(z.string()).min(1),
  supplier: z.string().optional(),
});

export const repairSchema = z.object({
  deviceId: z.number().int().positive(),
  description: z.string().min(5),
  technician: z.string().min(3),
  status: z.enum(['SCHEDULED', 'IN_PROGRESS', 'FINISHED', 'CANCELED']).optional(),
  startDate: z.string().datetime().optional(),
  estimatedEnd: z.string().datetime().optional(),
  actualEnd: z.string().datetime().optional(),
  cost: z.number().nonnegative().optional(),
});

export const partialCustomerSchema = customerSchema.partial();
export const partialDeviceSchema = deviceSchema.partial();
export const partialPartSchema = partSchema.partial();
export const partialRepairSchema = repairSchema.partial();
