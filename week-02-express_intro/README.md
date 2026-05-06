# Tienda de Reparación de Celulares - API REST

API REST construida con Express 5 y TypeScript para gestionar una tienda de reparación de celulares.

## Dominio

**Tienda de Reparación de Celulares**

Entidades principales:
- **Devices**: Dispositivos móviles que ingresan a la tienda
- **Repairs**: Reparaciones realizadas a los dispositivos
- **Parts**: Repuestos/piezas disponibles en inventario
- **Customers**: Clientes que solicitan los servicios

## Tecnologías

- Node.js 22+
- Express 5.1.0
- TypeScript 5.8.3
- pnpm (gestor de paquetes)

## Estructura del Proyecto

```
src/
├── app.ts                 # Configuración de Express y middlewares
├── server.ts              # Entry point
├── types.ts               # Interfaces TypeScript
├── store.ts               # Store en memoria (CRUD operations)
└── routes/
    ├── devices.routes.ts  # Rutas para dispositivos
    ├── repairs.routes.ts  # Rutas para reparaciones
    ├── parts.routes.ts    # Rutas para repuestos
    └── customers.routes.ts # Rutas para clientes
```

## Instalación

```bash
pnpm install
```

## Ejecución

```bash
# Desarrollo (con watch)
pnpm dev

# Compilar TypeScript
pnpm build

# Producción
pnpm start
```

El servidor se ejecutará en `http://localhost:3000`

## Endpoints API

### Devices

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/v1/devices` | Listar todos los dispositivos |
| GET | `/api/v1/devices/:id` | Obtener dispositivo por ID |
| POST | `/api/v1/devices` | Crear nuevo dispositivo |
| PUT | `/api/v1/devices/:id` | Actualizar dispositivo |
| DELETE | `/api/v1/devices/:id` | Eliminar dispositivo |

### Repairs

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/v1/repairs` | Listar todas las reparaciones |
| GET | `/api/v1/repairs/:id` | Obtener reparación por ID |
| POST | `/api/v1/repairs` | Crear nueva reparación |
| PUT | `/api/v1/repairs/:id` | Actualizar reparación |
| DELETE | `/api/v1/repairs/:id` | Eliminar reparación |

### Parts

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/v1/parts` | Listar todos los repuestos |
| GET | `/api/v1/parts/:id` | Obtener repuesto por ID |
| POST | `/api/v1/parts` | Crear nuevo repuesto |
| PUT | `/api/v1/parts/:id` | Actualizar repuesto |
| DELETE | `/api/v1/parts/:id` | Eliminar repuesto |

### Customers

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/v1/customers` | Listar todos los clientes |
| GET | `/api/v1/customers/:id` | Obtener cliente por ID |
| POST | `/api/v1/customers` | Crear nuevo cliente |
| PUT | `/api/v1/customers/:id` | Actualizar cliente |
| DELETE | `/api/v1/customers/:id` | Eliminar cliente |

## Ejemplos de Uso (curl)

### Devices

```bash
# Listar dispositivos
curl http://localhost:3000/api/v1/devices

# Crear dispositivo
curl -X POST http://localhost:3000/api/v1/devices \
  -H "Content-Type: application/json" \
  -d '{
    "brand": "Samsung",
    "model": "Galaxy S23",
    "customerName": "Juan Pérez",
    "customerPhone": "1234567890",
    "issue": "Pantalla rota",
    "status": "received",
    "estimatedCost": 350000
  }'

# Obtener dispositivo por ID
curl http://localhost:3000/api/v1/devices/1

# Actualizar dispositivo
curl -X PUT http://localhost:3000/api/v1/devices/1 \
  -H "Content-Type: application/json" \
  -d '{
    "brand": "Samsung",
    "model": "Galaxy S23",
    "customerName": "Juan Pérez",
    "customerPhone": "1234567890",
    "issue": "Pantalla rota y batería",
    "status": "repairing",
    "estimatedCost": 450000
  }'

# Eliminar dispositivo
curl -X DELETE http://localhost:3000/api/v1/devices/1
```

### Repairs

```bash
# Crear reparación
curl -X POST http://localhost:3000/api/v1/repairs \
  -H "Content-Type: application/json" \
  -d '{
    "deviceId": 1,
    "description": "Cambio de pantalla",
    "technician": "Carlos López",
    "status": "in_progress",
    "startDate": "2024-01-15",
    "estimatedEndDate": "2024-01-16"
  }'
```

### Parts

```bash
# Crear repuesto
curl -X POST http://localhost:3000/api/v1/parts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pantalla Samsung Galaxy S23",
    "category": "display",
    "price": 280000,
    "stock": 5,
    "compatibleBrands": ["Samsung"]
  }'
```

### Customers

```bash
# Crear cliente
curl -X POST http://localhost:3000/api/v1/customers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "María García",
    "phone": "0987654321",
    "email": "maria@email.com",
    "address": "Calle 123 #45-67"
  }'
```

## Decisiones de Diseño

1. **Store en memoria**: Se utiliza un array en memoria como base de datos temporal, siguiendo los requisitos del bootcamp.

2. **Validación básica**: Se validan los campos obligatorios en POST y PUT, retornando 400 si faltan.

3. **Códigos HTTP**: 
   - 200: Solicitud exitosa (GET, PUT)
   - 201: Recurso creado (POST)
   - 204: Sin contenido (DELETE)
   - 400: Solicitud incorrecta (validación)
   - 404: Recurso no encontrado

4. **Middlewares**:
   - `express.json()`: Parseo de body JSON
   - Logger personalizado: Registra método, URL, status y tiempo
   - Handler 404: Rutas no encontradas
   - Error handler global: 4 parámetros, siempre último

5. **TypeScript estricto**: Configuración con `strict: true` para máxima seguridad de tipos.

6. **Graceful shutdown**: Manejo de SIGTERM y SIGINT para cerrar el servidor correctamente.

## Entidades

### Device
- `id`: number (autogenerado)
- `brand`: string (marca del celular)
- `model`: string (modelo del celular)
- `customerName`: string (nombre del cliente)
- `customerPhone`: string (teléfono de contacto)
- `issue`: string (descripción del problema)
- `status`: enum ("received" | "diagnosing" | "repairing" | "completed" | "delivered")
- `estimatedCost`: number (costo estimado)
- `finalCost`: number (costo final, opcional)
- `entryDate`: string (fecha de ingreso)
- `exitDate`: string (fecha de salida, opcional)

### Repair
- `id`: number (autogenerado)
- `deviceId`: number (ID del dispositivo)
- `description`: string (descripción de la reparación)
- `technician`: string (técnico asignado)
- `status`: enum ("pending" | "in_progress" | "completed" | "cancelled")
- `startDate`: string (fecha de inicio)
- `estimatedEndDate`: string (fecha estimada de finalización)
- `actualEndDate`: string (fecha real de finalización, opcional)
- `cost`: number (costo de la reparación)

### Part
- `id`: number (autogenerado)
- `name`: string (nombre del repuesto)
- `category`: string (categoría: display, battery, charging_port, etc.)
- `price`: number (precio)
- `stock`: number (cantidad en inventario)
- `compatibleBrands`: string[] (marcas compatibles)
- `supplier`: string (proveedor, opcional)

### Customer
- `id`: number (autogenerado)
- `name`: string (nombre completo)
- `phone`: string (teléfono)
- `email`: string (correo electrónico, opcional)
- `address`: string (dirección, opcional)
- `registeredDate`: string (fecha de registro)
