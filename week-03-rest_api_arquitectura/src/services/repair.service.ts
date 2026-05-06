import * as repairRepo from '../repositories/repair.repository.js';
import * as deviceRepo from '../repositories/device.repository.js';
import type { Repair, CreateRepairDto, UpdateRepairDto } from '../types/index.js';

export function getAll(): Repair[] {
  return repairRepo.findAll();
}

export function getById(id: number): Repair | undefined {
  return repairRepo.findById(id);
}

export function create(data: CreateRepairDto): Repair {
  // Business rule: verify device exists
  const device = deviceRepo.findById(data.deviceId);
  if (!device) {
    throw new Error(`Device with id ${data.deviceId} not found`);
  }
  return repairRepo.create(data);
}

export function update(id: number, data: UpdateRepairDto): Repair | undefined {
  // Business rule: if deviceId changes, verify new device exists
  if (data.deviceId !== undefined) {
    const device = deviceRepo.findById(data.deviceId);
    if (!device) {
      throw new Error(`Device with id ${data.deviceId} not found`);
    }
  }
  return repairRepo.update(id, data);
}

export function remove(id: number): boolean {
  return repairRepo.remove(id);
}

export function count(): number {
  return repairRepo.count();
}
