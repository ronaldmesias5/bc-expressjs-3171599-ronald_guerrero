import { Router, type IRouter } from 'express';
import { partStore } from '../store.js';
import type { CreatePartDto, PartCategory } from '../types.js';

const router: IRouter = Router();

const validCategories: PartCategory[] = [
  "display", 
  "battery", 
  "charging_port", 
  "camera", 
  "speaker", 
  "microphone", 
  "back_cover", 
  "logic_board", 
  "other"
];

// GET /api/v1/parts - Listar todos los repuestos
router.get('/', (_req, res) => {
  const parts = partStore.getAll();
  res.status(200).json({
    success: true,
    data: parts,
    count: parts.length
  });
});

// GET /api/v1/parts/:id - Obtener repuesto por ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  
  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      error: 'ID inválido, debe ser un número'
    });
    return;
  }
  
  const part = partStore.getById(id);
  
  if (!part) {
    res.status(404).json({
      success: false,
      error: `Repuesto con ID ${id} no encontrado`
    });
    return;
  }
  
  res.status(200).json({
    success: true,
    data: part
  });
});

// POST /api/v1/parts - Crear nuevo repuesto
router.post('/', (req, res) => {
  const { name, category, price, stock, compatibleBrands, supplier } = req.body;
  
  // Validación de campos obligatorios
  const missingFields: string[] = [];
  if (!name) missingFields.push('name');
  if (!category) missingFields.push('category');
  if (price === undefined) missingFields.push('price');
  if (stock === undefined) missingFields.push('stock');
  if (!compatibleBrands) missingFields.push('compatibleBrands');
  
  if (missingFields.length > 0) {
    res.status(400).json({
      success: false,
      error: `Campos obligatorios faltantes: ${missingFields.join(', ')}`
    });
    return;
  }
  
  // Validación de tipo de category
  if (!validCategories.includes(category)) {
    res.status(400).json({
      success: false,
      error: `Categoría inválida. Valores permitidos: ${validCategories.join(', ')}`
    });
    return;
  }
  
  // Validación de tipo de price
  if (typeof price !== 'number' || price < 0) {
    res.status(400).json({
      success: false,
      error: 'price debe ser un número positivo'
    });
    return;
  }
  
  // Validación de tipo de stock
  if (typeof stock !== 'number' || stock < 0 || !Number.isInteger(stock)) {
    res.status(400).json({
      success: false,
      error: 'stock debe ser un número entero positivo'
    });
    return;
  }
  
  // Validación de compatibleBrands
  if (!Array.isArray(compatibleBrands) || compatibleBrands.length === 0) {
    res.status(400).json({
      success: false,
      error: 'compatibleBrands debe ser un array con al menos una marca'
    });
    return;
  }
  
  const newPart: CreatePartDto = {
    name,
    category,
    price,
    stock,
    compatibleBrands,
    supplier
  };
  
  const created = partStore.create(newPart);
  
  res.status(201).json({
    success: true,
    message: 'Repuesto creado exitosamente',
    data: created
  });
});

// PUT /api/v1/parts/:id - Actualizar repuesto
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  
  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      error: 'ID inválido, debe ser un número'
    });
    return;
  }
  
  const part = partStore.getById(id);
  
  if (!part) {
    res.status(404).json({
      success: false,
      error: `Repuesto con ID ${id} no encontrado`
    });
    return;
  }
  
  const { name, category, price, stock, compatibleBrands, supplier } = req.body;
  
  // Validación de campos obligatorios
  const missingFields: string[] = [];
  if (!name) missingFields.push('name');
  if (!category) missingFields.push('category');
  if (price === undefined) missingFields.push('price');
  if (stock === undefined) missingFields.push('stock');
  if (!compatibleBrands) missingFields.push('compatibleBrands');
  
  if (missingFields.length > 0) {
    res.status(400).json({
      success: false,
      error: `Campos obligatorios faltantes: ${missingFields.join(', ')}`
    });
    return;
  }
  
  // Validación de tipo de category
  if (!validCategories.includes(category)) {
    res.status(400).json({
      success: false,
      error: `Categoría inválida. Valores permitidos: ${validCategories.join(', ')}`
    });
    return;
  }
  
  // Validación de tipo de price
  if (typeof price !== 'number' || price < 0) {
    res.status(400).json({
      success: false,
      error: 'price debe ser un número positivo'
    });
    return;
  }
  
  // Validación de tipo de stock
  if (typeof stock !== 'number' || stock < 0 || !Number.isInteger(stock)) {
    res.status(400).json({
      success: false,
      error: 'stock debe ser un número entero positivo'
    });
    return;
  }
  
  // Validación de compatibleBrands
  if (!Array.isArray(compatibleBrands) || compatibleBrands.length === 0) {
    res.status(400).json({
      success: false,
      error: 'compatibleBrands debe ser un array con al menos una marca'
    });
    return;
  }
  
  const updatedPart: CreatePartDto = {
    name,
    category,
    price,
    stock,
    compatibleBrands,
    supplier
  };
  
  const updated = partStore.update(id, updatedPart);
  
  res.status(200).json({
    success: true,
    message: 'Repuesto actualizado exitosamente',
    data: updated
  });
});

// DELETE /api/v1/parts/:id - Eliminar repuesto
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  
  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      error: 'ID inválido, debe ser un número'
    });
    return;
  }
  
  const part = partStore.getById(id);
  
  if (!part) {
    res.status(404).json({
      success: false,
      error: `Repuesto con ID ${id} no encontrado`
    });
    return;
  }
  
  partStore.remove(id);
  
  res.status(204).send();
});

export default router;
