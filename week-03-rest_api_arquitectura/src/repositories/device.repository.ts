import type { Device, CreateDeviceDto, UpdateDeviceDto } from '../types/index.js';

// Repository: única capa que accede a los datos en memoria
const devices: Device[] = [];
let nextId = 1;

function seed(): void {
  const now = new Date().toISOString();
  const seedData: CreateDeviceDto[] = [
    {
      brand: "Samsung",
      model: "Galaxy S23",
      customerName: "Juan Pérez",
      customerPhone: "3001234567",
      issue: "Pantalla rota, no enciende",
      status: "received",
      estimatedCost: 450000,
      entryDate: now
    },
    {
      brand: "Apple",
      model: "iPhone 14 Pro",
      customerName: "María García",
      customerPhone: "3109876543",
      issue: "Batería se descarga rápido",
      status: "diagnosing",
      estimatedCost: 280000,
      entryDate: now
    },
    {
      brand: "Xiaomi",
      model: "Redmi Note 12",
      customerName: "Carlos López",
      customerPhone: "3204567890",
      issue: "No carga, puerto USB dañado",
      status: "repairing",
      estimatedCost: 150000,
      entryDate: now
    }
  ];
  for (const data of seedData) {
    create(data);
  }
}

export function findAll(): Device[] {
  return [...devices];
}

export function findById(id: number): Device | undefined {
  return devices.find(d => d.id === id);
}

export function create(data: CreateDeviceDto): Device {
  const device: Device = { ...data, id: nextId };
  devices.push(device);
  nextId++;
  return device;
}

export function update(id: number, data: UpdateDeviceDto): Device | undefined {
  const index = devices.findIndex(d => d.id === id);
  if (index === -1) return undefined;
  const existing = devices[index];
  const updated: Device = {
    ...existing,
    ...data,
    id
  };
  devices[index] = updated;
  return updated;
}

export function remove(id: number): boolean {
  const index = devices.findIndex(d => d.id === id);
  if (index === -1) return false;
  devices.splice(index, 1);
  return true;
}

export function count(): number {
  return devices.length;
}

// Seed on module load
seed();
