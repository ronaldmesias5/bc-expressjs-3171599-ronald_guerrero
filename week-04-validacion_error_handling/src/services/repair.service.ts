// ============================================
// SERVICE — Repair (lógica de negocio)
// ============================================
import * as repo from '../repositories/repair.repository.js';
import type { Repair } from '../types/index.js';
import type { CreateRepairDto, UpdateRepairDto } from '../schemas/index.js';
import { AppError } from '../errors/AppError.js';

interface FindAllOptions {
  page: number;
  limit: number;
}

export async function findAll(opts: FindAllOptions): Promise<{ data: Repair[]; total: number; page: number; limit: number }> {
  const all = await repo.findAll();
  const start = (opts.page - 1) * opts.limit;
  const data = all.slice(start, start + opts.limit);
  return { data, total: all.length, page: opts.page, limit: opts.limit };
}

export async function findById(id: number): Promise<Repair> {
  const repair = await repo.findById(id);
  if (!repair) throw new AppError(404, `Reparación con id ${id} no encontrada`);
  return repair;
}

export async function create(dto: CreateRepairDto): Promise<Repair> {
  return repo.create(dto);
}

export async function update(id: number, dto: UpdateRepairDto): Promise<Repair> {
  const exists = await repo.findById(id);
  if (!exists) throw new AppError(404, `Reparación con id ${id} no encontrada`);
  const updated = await repo.update(id, dto);
  return updated!;
}

export async function remove(id: number): Promise<void> {
  const exists = await repo.findById(id);
  if (!exists) throw new AppError(404, `Reparación con id ${id} no encontrada`);
  await repo.remove(id);
}
