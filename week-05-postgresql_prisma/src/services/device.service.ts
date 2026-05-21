import prisma from '../prisma.js';
import { AppError } from '../errors/AppError.js';
import type { Prisma } from '@prisma/client';

export async function findAll() {
  return prisma.device.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function findById(id: number) {
  const device = await prisma.device.findUnique({ where: { id } });
  if (!device) {
    throw new AppError('Dispositivo no encontrado', 404);
  }
  return device;
}

export async function create(payload: Prisma.DeviceCreateInput) {
  return prisma.device.create({ data: payload });
}

export async function update(id: number, payload: Prisma.DeviceUpdateInput) {
  await findById(id);
  return prisma.device.update({ where: { id }, data: payload });
}

export async function remove(id: number) {
  await findById(id);
  return prisma.device.delete({ where: { id } });
}
