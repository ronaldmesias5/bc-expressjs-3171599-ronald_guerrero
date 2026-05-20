import prisma from '../prisma.js';
import { AppError } from '../errors/AppError.js';
import type { Prisma } from '@prisma/client';

export async function findAll() {
  return prisma.repair.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function findById(id: number) {
  const repair = await prisma.repair.findUnique({ where: { id } });
  if (!repair) {
    throw new AppError('Reparación no encontrada', 404);
  }
  return repair;
}

export async function create(payload: Prisma.RepairCreateInput) {
  return prisma.repair.create({ data: payload });
}

export async function update(id: number, payload: Prisma.RepairUpdateInput) {
  await findById(id);
  return prisma.repair.update({ where: { id }, data: payload });
}

export async function remove(id: number) {
  await findById(id);
  return prisma.repair.delete({ where: { id } });
}
