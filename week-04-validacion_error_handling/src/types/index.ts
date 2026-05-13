// ============================================
// Tipos compartidos — Tienda de Reparación de Celulares
// ============================================

export type DeviceStatus = "received" | "diagnosing" | "repairing" | "completed" | "delivered";
export type RepairStatus = "pending" | "in_progress" | "completed" | "cancelled";
export type PartCategory =
  | "display" | "battery" | "charging_port" | "camera"
  | "speaker" | "microphone" | "back_cover" | "logic_board" | "other";

// ── Device ──
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

// ── Repair ──
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

// ── Part ──
export interface Part {
  id: number;
  name: string;
  category: PartCategory;
  price: number;
  stock: number;
  compatibleBrands: string[];
  supplier?: string;
}

// ── Customer ──
export interface Customer {
  id: number;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  createdAt: string;
}

// ── Respuestas genéricas ──
export interface SingleResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ValidationErrorResponse {
  error: string;
  message: string;
  issues: Array<{ field: string; message: string }>;
}

export interface ErrorResponse {
  error: string;
  message: string;
  stack?: string;
}
