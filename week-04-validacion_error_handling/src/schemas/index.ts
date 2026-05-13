// ============================================
// SCHEMAS — Validación Zod para todas las entidades
// Zod 4 API: usar { message } en vez de { required_error }, .error() en vez de errorMap
// ============================================
import { z } from 'zod';

// ── Device ──
const deviceStatus = z.enum(['received', 'diagnosing', 'repairing', 'completed', 'delivered'] as const);

export const createDeviceSchema = z.object({
  brand: z.string({ message: 'La marca es obligatoria' }).min(1, 'La marca no puede estar vacía').trim(),
  model: z.string({ message: 'El modelo es obligatorio' }).min(1, 'El modelo no puede estar vacío').trim(),
  customerName: z.string({ message: 'El nombre del cliente es obligatorio' }).min(1).trim(),
  customerPhone: z.string({ message: 'El teléfono es obligatorio' }).min(7, 'El teléfono debe tener al menos 7 caracteres').trim(),
  issue: z.string({ message: 'La falla es obligatoria' }).min(1).trim(),
  status: deviceStatus,
  estimatedCost: z.number({ message: 'El costo estimado es obligatorio' }).positive('El costo debe ser mayor a 0'),
  finalCost: z.number().positive('El costo final debe ser mayor a 0').optional(),
  entryDate: z.string().optional(),
  exitDate: z.string().optional(),
});

export const updateDeviceSchema = createDeviceSchema.partial();

export type CreateDeviceDto = z.infer<typeof createDeviceSchema>;
export type UpdateDeviceDto = z.infer<typeof updateDeviceSchema>;

// ── Repair ──
const repairStatus = z.enum(['pending', 'in_progress', 'completed', 'cancelled'] as const);

export const createRepairSchema = z.object({
  deviceId: z.number({ message: 'El deviceId es obligatorio' }).int().positive(),
  description: z.string({ message: 'La descripción es obligatoria' }).min(1).trim(),
  technician: z.string({ message: 'El técnico es obligatorio' }).min(1).trim(),
  status: repairStatus,
  startDate: z.string({ message: 'La fecha de inicio es obligatoria' }).min(1),
  estimatedEndDate: z.string({ message: 'La fecha estimada es obligatoria' }).min(1),
  actualEndDate: z.string().optional(),
  cost: z.number({ message: 'El costo es obligatorio' }).positive('El costo debe ser mayor a 0'),
});

export const updateRepairSchema = createRepairSchema.partial();

export type CreateRepairDto = z.infer<typeof createRepairSchema>;
export type UpdateRepairDto = z.infer<typeof updateRepairSchema>;

// ── Part ──
const partCategory = z.enum(
  ['display', 'battery', 'charging_port', 'camera', 'speaker', 'microphone', 'back_cover', 'logic_board', 'other'] as const
);
export const createPartSchema = z.object({
  name: z.string({ message: 'El nombre es obligatorio' }).min(1).trim(),
  category: partCategory,
  price: z.number({ message: 'El precio es obligatorio' }).positive('El precio debe ser mayor a 0'),
  stock: z.number({ message: 'El stock es obligatorio' }).int('Debe ser entero').nonnegative('No puede ser negativo'),
  compatibleBrands: z.array(z.string()).min(1, 'Debe tener al menos una marca compatible'),
  supplier: z.string().trim().optional(),
});

export const updatePartSchema = createPartSchema.partial();

export type CreatePartDto = z.infer<typeof createPartSchema>;
export type UpdatePartDto = z.infer<typeof updatePartSchema>;

// ── Customer ──
export const createCustomerSchema = z.object({
  name: z.string({ message: 'El nombre es obligatorio' }).min(1).trim(),
  phone: z.string({ message: 'El teléfono es obligatorio' }).min(7, 'Mínimo 7 caracteres').trim(),
  email: z.string().email('Email inválido').trim().optional().or(z.literal('')),
  address: z.string().trim().optional(),
});

export const updateCustomerSchema = createCustomerSchema.partial();

export type CreateCustomerDto = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerDto = z.infer<typeof updateCustomerSchema>;

// ── ID param ──
export const idSchema = z.coerce.number().int().positive({
  message: 'El id debe ser un número entero positivo',
});
