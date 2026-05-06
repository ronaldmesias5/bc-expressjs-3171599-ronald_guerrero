import * as customerRepo from '../repositories/customer.repository.js';
import type { Customer, CreateCustomerDto, UpdateCustomerDto } from '../types/index.js';

export function getAll(): Customer[] {
  return customerRepo.findAll();
}

export function getById(id: number): Customer | undefined {
  return customerRepo.findById(id);
}

export function create(data: CreateCustomerDto): Customer {
  return customerRepo.create(data);
}

export function update(id: number, data: UpdateCustomerDto): Customer | undefined {
  return customerRepo.update(id, data);
}

export function remove(id: number): boolean {
  return customerRepo.remove(id);
}

export function count(): number {
  return customerRepo.count();
}
