// ============================================
// SERVICE — Device (lógica de negocio)
// ============================================
import * as repo from '../repositories/device.repository.js';
import type { Device } from '../types/index.js';
import type { CreateDeviceDto, UpdateDeviceDto } from '../schemas/index.js';
import { AppError } from '../errors/AppError.js';

interface FindAllOptions {
  page: number;
  limit: number;
}

export async function findAll(opts: FindAllOptions): Promise<{ data: Device[]; total: number; page: number; limit: number }> {
  const all = await repo.findAll();
  const start = (opts.page - 1) * opts.limit;
  const data = all.slice(start, start + opts.limit);
  return { data, total: all.length, page: opts.page, limit: opts.limit };
}

export async function findById(id: number): Promise<Device> {
  const device = await repo.findById(id);
  if (!device) throw new AppError(404, `Dispositivo con id ${id} no encontrado`);
  return device;
}

export async function create(dto: CreateDeviceDto): Promise<Device> {
  return repo.create(dto);
}

export async function update(id: number, dto: UpdateDeviceDto): Promise<Device> {
  const exists = await repo.findById(id);
  if (!exists) throw new AppError(404, `Dispositivo con id ${id} no encontrado`);
  const updated = await repo.update(id, dto);
  return updated!;
}

export async function remove(id: number): Promise<void> {
  const exists = await repo.findById(id);
  if (!exists) throw new AppError(404, `Dispositivo con id ${id} no encontrado`);
  await repo.remove(id);
}
