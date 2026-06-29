import * as deviceRepository from '../repositories/device.repository';
import { CreateDeviceDto, UpdateDeviceDto } from '../schemas/device.schema';
import { AppError } from '../errors/AppError';

export async function getAll() {
  return deviceRepository.findAll();
}

export async function getById(id: string) {
  const device = await deviceRepository.findById(id);
  if (!device) throw new AppError(404, 'Dispositivo no encontrado');
  return device;
}

export async function create(dto: CreateDeviceDto, userId: string) {
  return deviceRepository.create({ ...dto, createdBy: userId });
}

export async function update(id: string, dto: UpdateDeviceDto) {
  await getById(id);
  return deviceRepository.updateById(id, dto);
}

export async function remove(id: string) {
  const deleted = await deviceRepository.deleteById(id);
  if (!deleted) throw new AppError(404, 'Dispositivo no encontrado');
}
