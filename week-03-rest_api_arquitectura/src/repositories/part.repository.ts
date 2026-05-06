import type { Part, CreatePartDto, UpdatePartDto } from '../types/index.js';

const parts: Part[] = [];
let nextId = 1;

function seed(): void {
  const seedData: CreatePartDto[] = [
    {
      name: "Pantalla Samsung Galaxy S23 Original",
      category: "display",
      price: 380000,
      stock: 3,
      compatibleBrands: ["Samsung"],
      supplier: "Samsung Parts Colombia"
    },
    {
      name: "Batería iPhone 14 Pro",
      category: "battery",
      price: 220000,
      stock: 5,
      compatibleBrands: ["Apple"],
      supplier: "Apple Service Center"
    },
    {
      name: "Puerto de carga USB-C Genérico",
      category: "charging_port",
      price: 45000,
      stock: 10,
      compatibleBrands: ["Samsung", "Xiaomi", "Motorola"],
      supplier: "Importaciones Tecno"
    },
    {
      name: "Cámara trasera iPhone 14 Pro",
      category: "camera",
      price: 350000,
      stock: 2,
      compatibleBrands: ["Apple"],
      supplier: "Apple Service Center"
    }
  ];
  for (const data of seedData) {
    create(data);
  }
}

export function findAll(): Part[] {
  return [...parts];
}

export function findById(id: number): Part | undefined {
  return parts.find(p => p.id === id);
}

export function create(data: CreatePartDto): Part {
  const part: Part = { ...data, id: nextId };
  parts.push(part);
  nextId++;
  return part;
}

export function update(id: number, data: UpdatePartDto): Part | undefined {
  const index = parts.findIndex(p => p.id === id);
  if (index === -1) return undefined;
  const existing = parts[index];
  const updated: Part = { ...existing, ...data, id };
  parts[index] = updated;
  return updated;
}

export function remove(id: number): boolean {
  const index = parts.findIndex(p => p.id === id);
  if (index === -1) return false;
  parts.splice(index, 1);
  return true;
}

export function count(): number {
  return parts.length;
}

seed();
