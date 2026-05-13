// ============================================
// REPOSITORY — Repair (en memoria)
// ============================================
import type { Repair } from '../types/index.js';
import type { CreateRepairDto, UpdateRepairDto } from '../schemas/index.js';

const repairs: Repair[] = [];
let nextId = 1;

export async function findAll(): Promise<Repair[]> {
  return [...repairs];
}

export async function findById(id: number): Promise<Repair | undefined> {
  return repairs.find(r => r.id === id);
}

export async function create(data: CreateRepairDto): Promise<Repair> {
  const repair: Repair = { ...data, id: nextId };
  repairs.push(repair);
  nextId++;
  return { ...repair };
}

export async function update(id: number, data: UpdateRepairDto): Promise<Repair | undefined> {
  const index = repairs.findIndex(r => r.id === id);
  if (index === -1) return undefined;
  repairs[index] = { ...repairs[index]!, ...data, id };
  return { ...repairs[index]! };
}

export async function remove(id: number): Promise<boolean> {
  const index = repairs.findIndex(r => r.id === id);
  if (index === -1) return false;
  repairs.splice(index, 1);
  return true;
}

export async function count(): Promise<number> {
  return repairs.length;
}
