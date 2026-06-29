import mongoose from 'mongoose';
import { Category } from '../models/category.model';
import { AppError } from '../errors/AppError';
import type { CreateCategoryDto } from '../schemas/category.schema';

export async function findAllCategories(): Promise<unknown[]> {
  return Category.find().sort({ name: 1 }).lean();
}

export async function findCategoryById(id: string): Promise<unknown> {
  try {
    const category = await Category.findById(id).lean();
    if (!category) throw new AppError(404, 'Categoría no encontrada');
    return category;
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) throw new AppError(400, 'ID inválido');
    throw err;
  }
}

export async function createCategory(dto: CreateCategoryDto): Promise<unknown> {
  try {
    const category = await Category.create(dto);
    return category.toJSON();
  } catch (err: unknown) {
    if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
      throw new AppError(409, 'La categoría ya existe');
    }
    throw err;
  }
}

export async function updateCategory(id: string, dto: Partial<CreateCategoryDto>): Promise<unknown> {
  try {
    const category = await Category.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    }).lean();
    if (!category) throw new AppError(404, 'Categoría no encontrada');
    return category;
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) throw new AppError(400, 'ID inválido');
    throw err;
  }
}

export async function deleteCategory(id: string): Promise<void> {
  try {
    const category = await Category.findByIdAndDelete(id).lean();
    if (!category) throw new AppError(404, 'Categoría no encontrada');
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) throw new AppError(400, 'ID inválido');
    throw err;
  }
}
