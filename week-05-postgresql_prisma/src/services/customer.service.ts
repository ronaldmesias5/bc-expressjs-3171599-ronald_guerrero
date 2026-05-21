import prisma from '../prisma.js';
import { AppError } from '../errors/AppError.js';
import type { Prisma } from '@prisma/client';

export async function findAll() {
  return prisma.customer.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function findById(id: number) {
  const customer = await prisma.customer.findUnique({ where: { id } });
  if (!customer) {
    throw new AppError('Cliente no encontrado', 404);
  }
  return customer;
}

export async function create(payload: Prisma.CustomerCreateInput) {
  return prisma.customer.create({ data: payload });
}

export async function update(id: number, payload: Prisma.CustomerUpdateInput) {
  await findById(id);
  return prisma.customer.update({ where: { id }, data: payload });
}

export async function remove(id: number) {
  await findById(id);
  return prisma.customer.delete({ where: { id } });
}
