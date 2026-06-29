import * as repo from '../repositories/customer.repository';
import type { CreateCustomerDto, UpdateCustomerDto } from '../schemas/customer.schema';

export async function getAll() {
  return repo.findAll();
}

export async function getById(id: string) {
  return repo.findById(id);
}

export async function createCustomer(dto: CreateCustomerDto) {
  return repo.create(dto);
}

export async function updateCustomer(id: string, dto: UpdateCustomerDto) {
  return repo.update(id, dto);
}

export async function deleteCustomer(id: string) {
  return repo.remove(id);
}
