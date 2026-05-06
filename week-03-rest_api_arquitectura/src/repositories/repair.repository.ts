import type { Repair, CreateRepairDto, UpdateRepairDto } from '../types/index.js';

const repairs: Repair[] = [];
let nextId = 1;

export function findAll(): Repair[] {
  return [...repairs];
}

export function findById(id: number): Repair | undefined {
  return repairs.find(r => r.id === id);
}

export function create(data: CreateRepairDto): Repair {
  const repair: Repair = { ...data, id: nextId };
  repairs.push(repair);
  nextId++;
  return repair;
}

export function update(id: number, data: UpdateRepairDto): Repair | undefined {
  const index = repairs.findIndex(r => r.id === id);
  if (index === -1) return undefined;
  const existing = repairs[index];
  const updated: Repair = { ...existing, ...data, id };
  repairs[index] = updated;
  return updated;
}

export function remove(id: number): boolean {
  const index = repairs.findIndex(r => r.id === id);
  if (index === -1) return false;
  repairs.splice(index, 1);
  return true;
}

export function count(): number {
  return repairs.length;
}
