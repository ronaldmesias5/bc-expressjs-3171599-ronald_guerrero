// ============================================
// SERVICE — Customer (lógica de negocio)
// ============================================
import * as repo from '../repositories/customer.repository.js';
import type { Customer } from '../types/index.js';
import type { CreateCustomerDto, UpdateCustomerDto } from '../schemas/index.js';
import { AppError } from '../errors/AppError.js';

interface FindAllOptions {
  page: number;
  limit: number;
}

export async function findAll(opts: FindAllOptions): Promise<{ data: Customer[]; total: number; page: number; limit: number }> {
  const all = await repo.findAll();
  const start = (opts.page - 1) * opts.limit;
  const data = all.slice(start, start + opts.limit);
  return { data, total: all.length, page: opts.page, limit: opts.limit };
}

export async function findById(id: number): Promise<Customer> {
  const customer = await repo.findById(id);
  if (!customer) throw new AppError(404, `Cliente con id ${id} no encontrado`);
  return customer;
}

export async function create(dto: CreateCustomerDto): Promise<Customer> {
  return repo.create(dto);
}

export async function update(id: number, dto: UpdateCustomerDto): Promise<Customer> {
  const exists = await repo.findById(id);
  if (!exists) throw new AppError(404, `Cliente con id ${id} no encontrado`);
  const updated = await repo.update(id, dto);
  return updated!;
}

export async function remove(id: number): Promise<void> {
  const exists = await repo.findById(id);
  if (!exists) throw new AppError(404, `Cliente con id ${id} no encontrado`);
  await repo.remove(id);
}
