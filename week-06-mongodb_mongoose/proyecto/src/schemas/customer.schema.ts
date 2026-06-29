import { z } from 'zod';

export const createCustomerSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(100),
  phone: z.string().min(7, 'El teléfono debe tener al menos 7 dígitos').max(20),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  address: z.string().max(200).optional(),
});

export const updateCustomerSchema = createCustomerSchema.partial();

export type CreateCustomerDto = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerDto = z.infer<typeof updateCustomerSchema>;
