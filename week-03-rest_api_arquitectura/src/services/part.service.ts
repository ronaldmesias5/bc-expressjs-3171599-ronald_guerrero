import * as partRepo from '../repositories/part.repository.js';
import type { Part, CreatePartDto, UpdatePartDto } from '../types/index.js';

export function getAll(): Part[] {
  return partRepo.findAll();
}

export function getById(id: number): Part | undefined {
  return partRepo.findById(id);
}

export function create(data: CreatePartDto): Part {
  return partRepo.create(data);
}

export function update(id: number, data: UpdatePartDto): Part | undefined {
  return partRepo.update(id, data);
}

export function remove(id: number): boolean {
  return partRepo.remove(id);
}

export function count(): number {
  return partRepo.count();
}
