// ============================================
// SERVICE — Part (lógica de negocio)
// ============================================
import * as repo from '../repositories/part.repository.js';
import type { Part } from '../types/index.js';
import type { CreatePartDto, UpdatePartDto } from '../schemas/index.js';
import { AppError } from '../errors/AppError.js';

interface FindAllOptions {
  page: number;
  limit: number;
}

export async function findAll(opts: FindAllOptions): Promise<{ data: Part[]; total: number; page: number; limit: number }> {
  const all = await repo.findAll();
  const start = (opts.page - 1) * opts.limit;
  const data = all.slice(start, start + opts.limit);
  return { data, total: all.length, page: opts.page, limit: opts.limit };
}

export async function findById(id: number): Promise<Part> {
  const part = await repo.findById(id);
  if (!part) throw new AppError(404, `Repuesto con id ${id} no encontrado`);
  return part;
}

export async function create(dto: CreatePartDto): Promise<Part> {
  return repo.create(dto);
}

export async function update(id: number, dto: UpdatePartDto): Promise<Part> {
  const exists = await repo.findById(id);
  if (!exists) throw new AppError(404, `Repuesto con id ${id} no encontrado`);
  const updated = await repo.update(id, dto);
  return updated!;
}

export async function remove(id: number): Promise<void> {
  const exists = await repo.findById(id);
  if (!exists) throw new AppError(404, `Repuesto con id ${id} no encontrado`);
  await repo.remove(id);
}
