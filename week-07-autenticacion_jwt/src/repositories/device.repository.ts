import mongoose from 'mongoose';
import { DeviceModel } from '../models/device.model';
import { AppError } from '../errors/AppError';
import type { CreateDeviceDto, UpdateDeviceDto } from '../schemas/device.schema';

export async function findAll(): Promise<unknown[]> {
  return DeviceModel.find().populate('customer').sort({ createdAt: -1 }).lean();
}

export async function findById(id: string): Promise<unknown> {
  try {
    const device = await DeviceModel.findById(id).populate('customer').lean();
    if (!device) throw new AppError(404, 'Dispositivo no encontrado');
    return device;
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) throw new AppError(400, 'ID inválido');
    throw err;
  }
}

export async function create(data: CreateDeviceDto & { createdBy: string }): Promise<unknown> {
  try {
    const device = await DeviceModel.create(data);
    return device.toJSON();
  } catch (err: unknown) {
    if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
      const field = Object.keys(err.keyValue ?? {})[0] ?? 'campo';
      throw new AppError(409, `El ${field} ya está registrado`);
    }
    throw err;
  }
}

export async function updateById(
  id: string,
  data: UpdateDeviceDto
): Promise<unknown> {
  try {
    const device = await DeviceModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();
    if (!device) throw new AppError(404, 'Dispositivo no encontrado');
    return device;
  } catch (err: unknown) {
    if (err instanceof mongoose.Error.CastError) throw new AppError(400, 'ID inválido');
    if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
      const field = Object.keys(err.keyValue ?? {})[0] ?? 'campo';
      throw new AppError(409, `El ${field} ya está registrado`);
    }
    throw err;
  }
}

export async function deleteById(id: string): Promise<boolean> {
  try {
    const device = await DeviceModel.findByIdAndDelete(id).lean();
    if (!device) return false;
    return true;
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) throw new AppError(400, 'ID inválido');
    throw err;
  }
}
