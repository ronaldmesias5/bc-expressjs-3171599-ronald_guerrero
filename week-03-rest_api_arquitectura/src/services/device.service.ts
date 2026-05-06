import * as deviceRepo from '../repositories/device.repository.js';
import type { Device, CreateDeviceDto, UpdateDeviceDto } from '../types/index.js';

export function getAll(): Device[] {
  return deviceRepo.findAll();
}

export function getById(id: number): Device | undefined {
  return deviceRepo.findById(id);
}

export function create(data: CreateDeviceDto): Device {
  return deviceRepo.create(data);
}

export function update(id: number, data: UpdateDeviceDto): Device | undefined {
  return deviceRepo.update(id, data);
}

export function remove(id: number): boolean {
  return deviceRepo.remove(id);
}

export function count(): number {
  return deviceRepo.count();
}
