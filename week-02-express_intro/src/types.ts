// ============================================
// Tipos compartidos
// ============================================

export type DeviceStatus = "received" | "diagnosing" | "repairing" | "completed" | "delivered";

export type RepairStatus = "pending" | "in_progress" | "completed" | "cancelled";

export type PartCategory = 
  | "display" 
  | "battery" 
  | "charging_port" 
  | "camera" 
  | "speaker" 
  | "microphone" 
  | "back_cover" 
  | "logic_board" 
  | "other";

// ============================================
// Device - Dispositivos móviles
// ============================================

export interface Device {
  id: number;
  brand: string;
  model: string;
  customerName: string;
  customerPhone: string;
  issue: string;
  status: DeviceStatus;
  estimatedCost: number;
  finalCost?: number;
  entryDate: string;
  exitDate?: string;
}

export type CreateDeviceDto = Omit<Device, 'id'>;

// ============================================
// Repair - Reparaciones
// ============================================

export interface Repair {
  id: number;
  deviceId: number;
  description: string;
  technician: string;
  status: RepairStatus;
  startDate: string;
  estimatedEndDate: string;
  actualEndDate?: string;
  cost: number;
}

export type CreateRepairDto = Omit<Repair, 'id'>;

// ============================================
// Part - Repuestos/Piezas
// ============================================

export interface Part {
  id: number;
  name: string;
  category: PartCategory;
  price: number;
  stock: number;
  compatibleBrands: string[];
  supplier?: string;
}

export type CreatePartDto = Omit<Part, 'id'>;

// ============================================
// Customer - Clientes
// ============================================

export interface Customer {
  id: number;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  registeredDate: string;
}

export type CreateCustomerDto = Omit<Customer, 'id'>;
