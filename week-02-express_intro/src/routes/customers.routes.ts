import { Router, type IRouter } from 'express';
import { customerStore } from '../store.js';
import type { CreateCustomerDto } from '../types.js';

const router: IRouter = Router();

// GET /api/v1/customers - Listar todos los clientes
router.get('/', (_req, res) => {
  const customers = customerStore.getAll();
  res.status(200).json({
    success: true,
    data: customers,
    count: customers.length
  });
});

// GET /api/v1/customers/:id - Obtener cliente por ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  
  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      error: 'ID inválido, debe ser un número'
    });
    return;
  }
  
  const customer = customerStore.getById(id);
  
  if (!customer) {
    res.status(404).json({
      success: false,
      error: `Cliente con ID ${id} no encontrado`
    });
    return;
  }
  
  res.status(200).json({
    success: true,
    data: customer
  });
});

// POST /api/v1/customers - Crear nuevo cliente
router.post('/', (req, res) => {
  const { name, phone, email, address } = req.body;
  
  // Validación de campos obligatorios
  const missingFields: string[] = [];
  if (!name) missingFields.push('name');
  if (!phone) missingFields.push('phone');
  
  if (missingFields.length > 0) {
    res.status(400).json({
      success: false,
      error: `Campos obligatorios faltantes: ${missingFields.join(', ')}`
    });
    return;
  }
  
  // Validación de formato de email si se proporciona
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        error: 'Formato de email inválido'
      });
      return;
    }
  }
  
  // Validación de formato de teléfono
  if (typeof phone !== 'string' || phone.length < 7) {
    res.status(400).json({
      success: false,
      error: 'Teléfono inválido, debe tener al menos 7 caracteres'
    });
    return;
  }
  
  const newCustomer: CreateCustomerDto = {
    name,
    phone,
    email,
    address,
    registeredDate: new Date().toISOString()
  };
  
  const created = customerStore.create(newCustomer);
  
  res.status(201).json({
    success: true,
    message: 'Cliente creado exitosamente',
    data: created
  });
});

// PUT /api/v1/customers/:id - Actualizar cliente
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  
  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      error: 'ID inválido, debe ser un número'
    });
    return;
  }
  
  const customer = customerStore.getById(id);
  
  if (!customer) {
    res.status(404).json({
      success: false,
      error: `Cliente con ID ${id} no encontrado`
    });
    return;
  }
  
  const { name, phone, email, address } = req.body;
  
  // Validación de campos obligatorios
  const missingFields: string[] = [];
  if (!name) missingFields.push('name');
  if (!phone) missingFields.push('phone');
  
  if (missingFields.length > 0) {
    res.status(400).json({
      success: false,
      error: `Campos obligatorios faltantes: ${missingFields.join(', ')}`
    });
    return;
  }
  
  // Validación de formato de email si se proporciona
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        error: 'Formato de email inválido'
      });
      return;
    }
  }
  
  // Validación de formato de teléfono
  if (typeof phone !== 'string' || phone.length < 7) {
    res.status(400).json({
      success: false,
      error: 'Teléfono inválido, debe tener al menos 7 caracteres'
    });
    return;
  }
  
  const updatedCustomer: CreateCustomerDto = {
    name,
    phone,
    email,
    address,
    registeredDate: customer.registeredDate
  };
  
  const updated = customerStore.update(id, updatedCustomer);
  
  res.status(200).json({
    success: true,
    message: 'Cliente actualizado exitosamente',
    data: updated
  });
});

// DELETE /api/v1/customers/:id - Eliminar cliente
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  
  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      error: 'ID inválido, debe ser un número'
    });
    return;
  }
  
  const customer = customerStore.getById(id);
  
  if (!customer) {
    res.status(404).json({
      success: false,
      error: `Cliente con ID ${id} no encontrado`
    });
    return;
  }
  
  customerStore.remove(id);
  
  res.status(204).send();
});

export default router;
