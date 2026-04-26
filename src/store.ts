import type { Device, Repair, Part, Customer } from './types.js';

// ============================================
// Store en memoria
// ============================================

class Store<T extends { id: number }> {
  private items: T[] = [];
  private nextId = 1;

  getAll(): T[] {
    return [...this.items];
  }

  getById(id: number): T | undefined {
    return this.items.find(item => item.id === id);
  }

  create(data: Omit<T, 'id'>): T {
    const newItem = { ...data, id: this.nextId } as T;
    this.items.push(newItem);
    this.nextId++;
    return newItem;
  }

  update(id: number, data: Omit<T, 'id'>): T | undefined {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) return undefined;
    
    const updatedItem = { ...data, id } as T;
    this.items[index] = updatedItem;
    return updatedItem;
  }

  remove(id: number): boolean {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) return false;
    
    this.items.splice(index, 1);
    return true;
  }

  // Método para datos iniciales (seed)
  seed(items: Omit<T, 'id'>[]): void {
    for (const item of items) {
      this.create(item);
    }
  }
}

// ============================================
// Instancias de store para cada entidad
// ============================================

export const deviceStore = new Store<Device>();
export const repairStore = new Store<Repair>();
export const partStore = new Store<Part>();
export const customerStore = new Store<Customer>();

// ============================================
// Datos iniciales (seed data)
// ============================================

// Seed para dispositivos
deviceStore.seed([
  {
    brand: "Samsung",
    model: "Galaxy S23",
    customerName: "Juan Pérez",
    customerPhone: "3001234567",
    issue: "Pantalla rota, no enciende",
    status: "received",
    estimatedCost: 450000,
    entryDate: new Date().toISOString()
  },
  {
    brand: "Apple",
    model: "iPhone 14 Pro",
    customerName: "María García",
    customerPhone: "3109876543",
    issue: "Batería se descarga rápido",
    status: "diagnosing",
    estimatedCost: 280000,
    entryDate: new Date().toISOString()
  },
  {
    brand: "Xiaomi",
    model: "Redmi Note 12",
    customerName: "Carlos López",
    customerPhone: "3204567890",
    issue: "No carga, puerto USB dañado",
    status: "repairing",
    estimatedCost: 150000,
    entryDate: new Date().toISOString()
  }
]);

// Seed para clientes
customerStore.seed([
  {
    name: "Juan Pérez",
    phone: "3001234567",
    email: "juan.perez@email.com",
    address: "Calle 45 #12-34, Bogotá",
    registeredDate: new Date().toISOString()
  },
  {
    name: "María García",
    phone: "3109876543",
    email: "maria.garcia@email.com",
    address: "Carrera 15 #67-89, Medellín",
    registeredDate: new Date().toISOString()
  },
  {
    name: "Carlos López",
    phone: "3204567890",
    address: "Avenida 7 #23-45, Cali",
    registeredDate: new Date().toISOString()
  }
]);

// Seed para repuestos
partStore.seed([
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
]);
