// ============================================
// REPOSITORY — Device (en memoria)
// ============================================
import type { Device } from '../types/index.js';
import type { CreateDeviceDto, UpdateDeviceDto } from '../schemas/index.js';

const devices: Device[] = [];
let nextId = 1;

function seed(): void {
  const now = new Date().toISOString();
  const seedData: CreateDeviceDto[] = [
    {
      brand: 'Samsung',
      model: 'Galaxy S23',
      customerName: 'Juan Pérez',
      customerPhone: '3001234567',
      issue: 'Pantalla rota, no enciende',
      status: 'received',
      estimatedCost: 450000,
      entryDate: now,
    },
    {
      brand: 'Apple',
      model: 'iPhone 14 Pro',
      customerName: 'María García',
      customerPhone: '3109876543',
      issue: 'Batería se descarga rápido',
      status: 'diagnosing',
      estimatedCost: 280000,
      entryDate: now,
    },
    {
      brand: 'Xiaomi',
      model: 'Redmi Note 12',
      customerName: 'Carlos López',
      customerPhone: '3204567890',
      issue: 'No carga, puerto USB dañado',
      status: 'repairing',
      estimatedCost: 150000,
      entryDate: now,
    },
  ];
  for (const data of seedData) {
    create(data);
  }
}

export async function findAll(): Promise<Device[]> {
  return [...devices];
}

export async function findById(id: number): Promise<Device | undefined> {
  return devices.find(d => d.id === id);
}

export async function create(data: CreateDeviceDto): Promise<Device> {
  const device: Device = {
    ...data,
    id: nextId,
    entryDate: data.entryDate ?? new Date().toISOString(),
  };
  devices.push(device);
  nextId++;
  return { ...device };
}

export async function update(id: number, data: UpdateDeviceDto): Promise<Device | undefined> {
  const index = devices.findIndex(d => d.id === id);
  if (index === -1) return undefined;
  devices[index] = { ...devices[index]!, ...data, id };
  return { ...devices[index]! };
}

export async function remove(id: number): Promise<boolean> {
  const index = devices.findIndex(d => d.id === id);
  if (index === -1) return false;
  devices.splice(index, 1);
  return true;
}

export async function count(): Promise<number> {
  return devices.length;
}

seed();
