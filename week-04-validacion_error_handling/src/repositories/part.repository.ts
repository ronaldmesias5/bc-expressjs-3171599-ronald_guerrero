// ============================================
// REPOSITORY — Part (en memoria)
// ============================================
import type { Part } from '../types/index.js';
import type { CreatePartDto, UpdatePartDto } from '../schemas/index.js';

const parts: Part[] = [];
let nextId = 1;

export async function findAll(): Promise<Part[]> {
  return [...parts];
}

export async function findById(id: number): Promise<Part | undefined> {
  return parts.find(p => p.id === id);
}

export async function create(data: CreatePartDto): Promise<Part> {
  const part: Part = { ...data, id: nextId };
  parts.push(part);
  nextId++;
  return { ...part };
}

export async function update(id: number, data: UpdatePartDto): Promise<Part | undefined> {
  const index = parts.findIndex(p => p.id === id);
  if (index === -1) return undefined;
  parts[index] = { ...parts[index]!, ...data, id };
  return { ...parts[index]! };
}

export async function remove(id: number): Promise<boolean> {
  const index = parts.findIndex(p => p.id === id);
  if (index === -1) return false;
  parts.splice(index, 1);
  return true;
}

export async function count(): Promise<number> {
  return parts.length;
}
