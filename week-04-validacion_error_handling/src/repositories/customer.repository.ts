// ============================================
// REPOSITORY — Customer (en memoria)
// ============================================
import type { Customer } from '../types/index.js';
import type { CreateCustomerDto, UpdateCustomerDto } from '../schemas/index.js';

const customers: Customer[] = [];
let nextId = 1;

export async function findAll(): Promise<Customer[]> {
  return [...customers];
}

export async function findById(id: number): Promise<Customer | undefined> {
  return customers.find(c => c.id === id);
}

export async function create(data: CreateCustomerDto): Promise<Customer> {
  const customer: Customer = { ...data, id: nextId, createdAt: new Date().toISOString() };
  customers.push(customer);
  nextId++;
  return { ...customer };
}

export async function update(id: number, data: UpdateCustomerDto): Promise<Customer | undefined> {
  const index = customers.findIndex(c => c.id === id);
  if (index === -1) return undefined;
  customers[index] = { ...customers[index]!, ...data, id };
  return { ...customers[index]! };
}

export async function remove(id: number): Promise<boolean> {
  const index = customers.findIndex(c => c.id === id);
  if (index === -1) return false;
  customers.splice(index, 1);
  return true;
}

export async function count(): Promise<number> {
  return customers.length;
}
