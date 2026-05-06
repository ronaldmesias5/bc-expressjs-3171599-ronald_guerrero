import type { Customer, CreateCustomerDto, UpdateCustomerDto } from '../types/index.js';

const customers: Customer[] = [];
let nextId = 1;

function seed(): void {
  const now = new Date().toISOString();
  const seedData: CreateCustomerDto[] = [
    {
      name: "Juan Pérez",
      phone: "3001234567",
      email: "juan.perez@email.com",
      address: "Calle 45 #12-34, Bogotá"
    },
    {
      name: "María García",
      phone: "3109876543",
      email: "maria.garcia@email.com",
      address: "Carrera 15 #67-89, Medellín"
    },
    {
      name: "Carlos López",
      phone: "3204567890",
      address: "Avenida 7 #23-45, Cali"
    }
  ];
  for (const data of seedData) {
    create(data);
  }
}

export function findAll(): Customer[] {
  return [...customers];
}

export function findById(id: number): Customer | undefined {
  return customers.find(c => c.id === id);
}

export function create(data: CreateCustomerDto): Customer {
  const customer: Customer = { ...data, id: nextId, registeredDate: new Date().toISOString() };
  customers.push(customer);
  nextId++;
  return customer;
}

export function update(id: number, data: UpdateCustomerDto): Customer | undefined {
  const index = customers.findIndex(c => c.id === id);
  if (index === -1) return undefined;
  const existing = customers[index];
  const updated: Customer = { ...existing, ...data, id, registeredDate: existing.registeredDate };
  customers[index] = updated;
  return updated;
}

export function remove(id: number): boolean {
  const index = customers.findIndex(c => c.id === id);
  if (index === -1) return false;
  customers.splice(index, 1);
  return true;
}

export function count(): number {
  return customers.length;
}

seed();
