import * as repo from '../repositories/categories.repository';
import type { CreateCategoryDto, UpdateCategoryDto } from '../schemas/category.schema';

export async function getAll() {
  return repo.findAllCategories();
}

export async function getById(id: string) {
  return repo.findCategoryById(id);
}

export async function createCategory(dto: CreateCategoryDto) {
  return repo.createCategory(dto);
}

export async function updateCategory(id: string, dto: UpdateCategoryDto) {
  return repo.updateCategory(id, dto);
}

export async function deleteCategory(id: string) {
  return repo.deleteCategory(id);
}
