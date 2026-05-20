import prisma from '../prisma.js';
import { AppError } from '../errors/AppError.js';
import type { Prisma } from '@prisma/client';

export async function findAll() {
  return prisma.part.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function findById(id: number) {
  const part = await prisma.part.findUnique({ where: { id } });
  if (!part) {
    throw new AppError('Repuesto no encontrado', 404);
  }
  return part;
}

export async function create(payload: Prisma.PartCreateInput) {
  return prisma.part.create({ data: payload });
}

export async function update(id: number, payload: Prisma.PartUpdateInput) {
  await findById(id);
  return prisma.part.update({ where: { id }, data: payload });
}

export async function remove(id: number) {
  await findById(id);
  return prisma.part.delete({ where: { id } });
}
