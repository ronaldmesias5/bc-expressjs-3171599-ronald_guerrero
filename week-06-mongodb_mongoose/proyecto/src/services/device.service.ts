import * as repo from '../repositories/device.repository';
import type { CreateDeviceDto, UpdateDeviceDto } from '../schemas/device.schema';

export async function getAll(page: number, limit: number, search?: string) {
  return repo.findAll(page, limit, search);
}

export async function getById(id: string) {
  return repo.findById(id);
}

export async function createDevice(dto: CreateDeviceDto) {
  return repo.create(dto);
}

export async function updateDevice(id: string, dto: UpdateDeviceDto) {
  return repo.update(id, dto);
}

export async function deleteDevice(id: string) {
  return repo.remove(id);
}
