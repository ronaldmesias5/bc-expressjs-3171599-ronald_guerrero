import mongoose from 'mongoose';
import { Device } from '../models/device.model';
import { AppError } from '../errors/AppError';
import type { CreateDeviceDto, UpdateDeviceDto } from '../schemas/device.schema';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export async function findAll(
  page: number,
  limit: number,
  search?: string,
): Promise<PaginatedResult<unknown>> {
  const skip = (page - 1) * limit;
  const filter = search
    ? { brand: { $regex: search, $options: 'i' } }
    : {};

  const [data, total] = await Promise.all([
    Device.find(filter)
      .populate('customer')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Device.countDocuments(filter),
  ]);

  return { data, total, page, totalPages: Math.ceil(total / limit) };
}

export async function findById(id: string): Promise<unknown> {
  try {
    const device = await Device.findById(id)
      .populate('customer')
      .lean();
    if (!device) throw new AppError(404, 'Dispositivo no encontrado');
    return device;
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) throw new AppError(400, 'ID inválido');
    throw err;
  }
}

export async function create(dto: CreateDeviceDto): Promise<unknown> {
  try {
    const device = await Device.create(dto);
    return device.toJSON();
  } catch (err: unknown) {
    if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
      const field = Object.keys(err.keyValue ?? {})[0] ?? 'campo';
      throw new AppError(409, `El ${field} ya está registrado`);
    }
    throw err;
  }
}

export async function update(id: string, dto: UpdateDeviceDto): Promise<unknown> {
  try {
    const device = await Device.findByIdAndUpdate(id, dto, {
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

export async function remove(id: string): Promise<void> {
  try {
    const device = await Device.findByIdAndDelete(id).lean();
    if (!device) throw new AppError(404, 'Dispositivo no encontrado');
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) throw new AppError(400, 'ID inválido');
    throw err;
  }
}
