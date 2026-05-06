// ============================================
// Tipos compartidos y enums
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
// Device — Dispositivos móviles
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

export interface CreateDeviceDto {
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

export interface UpdateDeviceDto {
  brand?: string;
  model?: string;
  customerName?: string;
  customerPhone?: string;
  issue?: string;
  status?: DeviceStatus;
  estimatedCost?: number;
  finalCost?: number;
  exitDate?: string;
}

// ============================================
// Repair — Reparaciones
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

export interface CreateRepairDto {
  deviceId: number;
  description: string;
  technician: string;
  status: RepairStatus;
  startDate: string;
  estimatedEndDate: string;
  actualEndDate?: string;
  cost: number;
}

export interface UpdateRepairDto {
  deviceId?: number;
  description?: string;
  technician?: string;
  status?: RepairStatus;
  startDate?: string;
  estimatedEndDate?: string;
  actualEndDate?: string;
  cost?: number;
}

// ============================================
// Part — Repuestos / Piezas
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

export interface CreatePartDto {
  name: string;
  category: PartCategory;
  price: number;
  stock: number;
  compatibleBrands: string[];
  supplier?: string;
}

export interface UpdatePartDto {
  name?: string;
  category?: PartCategory;
  price?: number;
  stock?: number;
  compatibleBrands?: string[];
  supplier?: string;
}

// ============================================
// Customer — Clientes
// ============================================

export interface Customer {
  id: number;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  registeredDate: string;
}

export interface CreateCustomerDto {
  name: string;
  phone: string;
  email?: string;
  address?: string;
}

export interface UpdateCustomerDto {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
}
