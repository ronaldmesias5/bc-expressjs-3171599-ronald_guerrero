import mongoose from 'mongoose';
import { Customer } from '../models/customer.model';
import { AppError } from '../errors/AppError';
import type { CreateCustomerDto, UpdateCustomerDto } from '../schemas/customer.schema';

export async function findAll(): Promise<unknown[]> {
  return Customer.find().sort({ name: 1 }).lean();
}

export async function findById(id: string): Promise<unknown> {
  try {
    const customer = await Customer.findById(id).lean();
    if (!customer) throw new AppError(404, 'Cliente no encontrado');
    return customer;
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) throw new AppError(400, 'ID inválido');
    throw err;
  }
}

export async function create(dto: CreateCustomerDto): Promise<unknown> {
  try {
    const customer = await Customer.create(dto);
    return customer.toJSON();
  } catch (err: unknown) {
    if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
      throw new AppError(409, 'Ya existe un cliente con ese email');
    }
    throw err;
  }
}

export async function update(id: string, dto: UpdateCustomerDto): Promise<unknown> {
  try {
    const customer = await Customer.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    }).lean();
    if (!customer) throw new AppError(404, 'Cliente no encontrado');
    return customer;
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) throw new AppError(400, 'ID inválido');
    throw err;
  }
}

export async function remove(id: string): Promise<void> {
  try {
    const customer = await Customer.findByIdAndDelete(id).lean();
    if (!customer) throw new AppError(404, 'Cliente no encontrado');
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) throw new AppError(400, 'ID inválido');
    throw err;
  }
}
