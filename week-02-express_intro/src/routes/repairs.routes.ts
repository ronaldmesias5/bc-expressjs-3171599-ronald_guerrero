import { Router, type IRouter } from 'express';
import { repairStore, deviceStore } from '../store.js';
import type { CreateRepairDto, RepairStatus } from '../types.js';

const router: IRouter = Router();

const validStatuses: RepairStatus[] = ["pending", "in_progress", "completed", "cancelled"];

// GET /api/v1/repairs - Listar todas las reparaciones
router.get('/', (_req, res) => {
  const repairs = repairStore.getAll();
  res.status(200).json({
    success: true,
    data: repairs,
    count: repairs.length
  });
});

// GET /api/v1/repairs/:id - Obtener reparación por ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  
  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      error: 'ID inválido, debe ser un número'
    });
    return;
  }
  
  const repair = repairStore.getById(id);
  
  if (!repair) {
    res.status(404).json({
      success: false,
      error: `Reparación con ID ${id} no encontrada`
    });
    return;
  }
  
  res.status(200).json({
    success: true,
    data: repair
  });
});

// POST /api/v1/repairs - Crear nueva reparación
router.post('/', (req, res) => {
  const { deviceId, description, technician, status, startDate, estimatedEndDate, cost } = req.body;
  
  // Validación de campos obligatorios
  const missingFields: string[] = [];
  if (deviceId === undefined) missingFields.push('deviceId');
  if (!description) missingFields.push('description');
  if (!technician) missingFields.push('technician');
  if (!status) missingFields.push('status');
  if (!startDate) missingFields.push('startDate');
  if (!estimatedEndDate) missingFields.push('estimatedEndDate');
  if (cost === undefined) missingFields.push('cost');
  
  if (missingFields.length > 0) {
    res.status(400).json({
      success: false,
      error: `Campos obligatorios faltantes: ${missingFields.join(', ')}`
    });
    return;
  }
  
  // Validar que el dispositivo exista
  const device = deviceStore.getById(deviceId);
  if (!device) {
    res.status(400).json({
      success: false,
      error: `Dispositivo con ID ${deviceId} no encontrado`
    });
    return;
  }
  
  // Validación de tipo de status
  if (!validStatuses.includes(status)) {
    res.status(400).json({
      success: false,
      error: `Status inválido. Valores permitidos: ${validStatuses.join(', ')}`
    });
    return;
  }
  
  // Validación de tipo de cost
  if (typeof cost !== 'number' || cost < 0) {
    res.status(400).json({
      success: false,
      error: 'cost debe ser un número positivo'
    });
    return;
  }
  
  const newRepair: CreateRepairDto = {
    deviceId,
    description,
    technician,
    status,
    startDate,
    estimatedEndDate,
    cost
  };
  
  const created = repairStore.create(newRepair);
  
  res.status(201).json({
    success: true,
    message: 'Reparación creada exitosamente',
    data: created
  });
});

// PUT /api/v1/repairs/:id - Actualizar reparación
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  
  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      error: 'ID inválido, debe ser un número'
    });
    return;
  }
  
  const repair = repairStore.getById(id);
  
  if (!repair) {
    res.status(404).json({
      success: false,
      error: `Reparación con ID ${id} no encontrada`
    });
    return;
  }
  
  const { deviceId, description, technician, status, startDate, estimatedEndDate, actualEndDate, cost } = req.body;
  
  // Validación de campos obligatorios
  const missingFields: string[] = [];
  if (deviceId === undefined) missingFields.push('deviceId');
  if (!description) missingFields.push('description');
  if (!technician) missingFields.push('technician');
  if (!status) missingFields.push('status');
  if (!startDate) missingFields.push('startDate');
  if (!estimatedEndDate) missingFields.push('estimatedEndDate');
  if (cost === undefined) missingFields.push('cost');
  
  if (missingFields.length > 0) {
    res.status(400).json({
      success: false,
      error: `Campos obligatorios faltantes: ${missingFields.join(', ')}`
    });
    return;
  }
  
  // Validar que el dispositivo exista
  const device = deviceStore.getById(deviceId);
  if (!device) {
    res.status(400).json({
      success: false,
      error: `Dispositivo con ID ${deviceId} no encontrado`
    });
    return;
  }
  
  // Validación de tipo de status
  if (!validStatuses.includes(status)) {
    res.status(400).json({
      success: false,
      error: `Status inválido. Valores permitidos: ${validStatuses.join(', ')}`
    });
    return;
  }
  
  // Validación de tipo de cost
  if (typeof cost !== 'number' || cost < 0) {
    res.status(400).json({
      success: false,
      error: 'cost debe ser un número positivo'
    });
    return;
  }
  
  const updatedRepair: CreateRepairDto = {
    deviceId,
    description,
    technician,
    status,
    startDate,
    estimatedEndDate,
    actualEndDate,
    cost
  };
  
  const updated = repairStore.update(id, updatedRepair);
  
  res.status(200).json({
    success: true,
    message: 'Reparación actualizada exitosamente',
    data: updated
  });
});

// DELETE /api/v1/repairs/:id - Eliminar reparación
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  
  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      error: 'ID inválido, debe ser un número'
    });
    return;
  }
  
  const repair = repairStore.getById(id);
  
  if (!repair) {
    res.status(404).json({
      success: false,
      error: `Reparación con ID ${id} no encontrada`
    });
    return;
  }
  
  repairStore.remove(id);
  
  res.status(204).send();
});

export default router;
