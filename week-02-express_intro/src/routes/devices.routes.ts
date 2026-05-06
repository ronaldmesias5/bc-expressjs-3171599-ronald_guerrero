import { Router, type IRouter } from 'express';
import { deviceStore } from '../store.js';
import type { CreateDeviceDto, DeviceStatus } from '../types.js';

const router: IRouter = Router();

const validStatuses: DeviceStatus[] = ["received", "diagnosing", "repairing", "completed", "delivered"];

// GET /api/v1/devices - Listar todos los dispositivos
router.get('/', (_req, res) => {
  const devices = deviceStore.getAll();
  res.status(200).json({
    success: true,
    data: devices,
    count: devices.length
  });
});

// GET /api/v1/devices/:id - Obtener dispositivo por ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  
  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      error: 'ID inválido, debe ser un número'
    });
    return;
  }
  
  const device = deviceStore.getById(id);
  
  if (!device) {
    res.status(404).json({
      success: false,
      error: `Dispositivo con ID ${id} no encontrado`
    });
    return;
  }
  
  res.status(200).json({
    success: true,
    data: device
  });
});

// POST /api/v1/devices - Crear nuevo dispositivo
router.post('/', (req, res) => {
  const { brand, model, customerName, customerPhone, issue, status, estimatedCost } = req.body;
  
  // Validación de campos obligatorios
  const missingFields: string[] = [];
  if (!brand) missingFields.push('brand');
  if (!model) missingFields.push('model');
  if (!customerName) missingFields.push('customerName');
  if (!customerPhone) missingFields.push('customerPhone');
  if (!issue) missingFields.push('issue');
  if (status === undefined) missingFields.push('status');
  if (estimatedCost === undefined) missingFields.push('estimatedCost');
  
  if (missingFields.length > 0) {
    res.status(400).json({
      success: false,
      error: `Campos obligatorios faltantes: ${missingFields.join(', ')}`
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
  
  // Validación de tipo de estimatedCost
  if (typeof estimatedCost !== 'number' || estimatedCost < 0) {
    res.status(400).json({
      success: false,
      error: 'estimatedCost debe ser un número positivo'
    });
    return;
  }
  
  const newDevice: CreateDeviceDto = {
    brand,
    model,
    customerName,
    customerPhone,
    issue,
    status,
    estimatedCost,
    entryDate: new Date().toISOString()
  };
  
  const created = deviceStore.create(newDevice);
  
  res.status(201).json({
    success: true,
    message: 'Dispositivo creado exitosamente',
    data: created
  });
});

// PUT /api/v1/devices/:id - Actualizar dispositivo
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  
  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      error: 'ID inválido, debe ser un número'
    });
    return;
  }
  
  const device = deviceStore.getById(id);
  
  if (!device) {
    res.status(404).json({
      success: false,
      error: `Dispositivo con ID ${id} no encontrado`
    });
    return;
  }
  
  const { brand, model, customerName, customerPhone, issue, status, estimatedCost, finalCost, exitDate } = req.body;
  
  // Validación de campos obligatorios
  const missingFields: string[] = [];
  if (!brand) missingFields.push('brand');
  if (!model) missingFields.push('model');
  if (!customerName) missingFields.push('customerName');
  if (!customerPhone) missingFields.push('customerPhone');
  if (!issue) missingFields.push('issue');
  if (status === undefined) missingFields.push('status');
  if (estimatedCost === undefined) missingFields.push('estimatedCost');
  
  if (missingFields.length > 0) {
    res.status(400).json({
      success: false,
      error: `Campos obligatorios faltantes: ${missingFields.join(', ')}`
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
  
  // Validación de tipo de estimatedCost
  if (typeof estimatedCost !== 'number' || estimatedCost < 0) {
    res.status(400).json({
      success: false,
      error: 'estimatedCost debe ser un número positivo'
    });
    return;
  }
  
  // Validación de finalCost si está presente
  if (finalCost !== undefined && (typeof finalCost !== 'number' || finalCost < 0)) {
    res.status(400).json({
      success: false,
      error: 'finalCost debe ser un número positivo'
    });
    return;
  }
  
  const updatedDevice: CreateDeviceDto = {
    brand,
    model,
    customerName,
    customerPhone,
    issue,
    status,
    estimatedCost,
    finalCost,
    entryDate: device.entryDate,
    exitDate
  };
  
  const updated = deviceStore.update(id, updatedDevice);
  
  res.status(200).json({
    success: true,
    message: 'Dispositivo actualizado exitosamente',
    data: updated
  });
});

// DELETE /api/v1/devices/:id - Eliminar dispositivo
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  
  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      error: 'ID inválido, debe ser un número'
    });
    return;
  }
  
  const device = deviceStore.getById(id);
  
  if (!device) {
    res.status(404).json({
      success: false,
      error: `Dispositivo con ID ${id} no encontrado`
    });
    return;
  }
  
  deviceStore.remove(id);
  
  res.status(204).send();
});

export default router;
