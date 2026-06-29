# Week 06 — Proyecto: API REST con MongoDB + Mongoose

API REST de **tienda de reparación de celulares** construida con Express 5, TypeScript y Mongoose, utilizando MongoDB como base de datos con dos entidades relacionadas mediante `populate()`.

## Dominio

**Tienda de Reparación de Celulares**

| Entidad | Tipo | Descripción |
|---------|------|-------------|
| Customer | Secundaria | Clientes que solicitan servicios |
| Device | Principal | Dispositivos móviles que ingresan a la tienda |

## Stack Técnico

- Node.js 22+ / Express 5.1.0 / TypeScript 5.8.3
- Mongoose 9.4.1 / MongoDB 7 (Docker)
- Zod 4.3.6

## Estructura

```
src/
├── lib/mongoose.ts              # Conexión a MongoDB
├── models/
│   ├── customer.model.ts        # Schema de cliente
│   └── device.model.ts          # Schema de dispositivo con ref a Customer
├── schemas/
│   ├── customer.schema.ts       # Validación Zod para cliente
│   └── device.schema.ts         # Validación Zod para dispositivo
├── repositories/
│   ├── customer.repository.ts   # CRUD de clientes
│   └── device.repository.ts     # CRUD de dispositivos con populate
├── services/
│   ├── customer.service.ts      # Lógica de negocio de clientes
│   └── device.service.ts        # Lógica de negocio de dispositivos
├── controllers/
│   ├── customer.controller.ts   # Handlers HTTP de clientes
│   └── device.controller.ts     # Handlers HTTP de dispositivos
├── routes/
│   ├── customer.routes.ts       # Rutas de clientes
│   └── device.routes.ts         # Rutas de dispositivos
├── errors/AppError.ts           # Clase de error personalizada
├── middlewares/                  # errorHandler y notFound
├── app.ts                       # Configuración Express
├── server.ts                    # Entry point
└── seed.ts                      # Datos de prueba
```

## Configuración

```bash
# 1. Copiar variables de entorno
cp .env.example .env

# 2. Levantar MongoDB con Docker
docker compose up -d

# 3. Instalar dependencias
pnpm install

# 4. Insertar datos de prueba (3 clientes + 6 dispositivos)
pnpm seed

# 5. Iniciar servidor
pnpm dev
```

Servidor en `http://localhost:3000`

## Endpoints

### Clientes (entidad secundaria)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/v1/customers` | Listar todos los clientes |
| GET | `/api/v1/customers/:id` | Obtener cliente por ID |
| POST | `/api/v1/customers` | Crear nuevo cliente |
| PUT | `/api/v1/customers/:id` | Actualizar cliente |
| DELETE | `/api/v1/customers/:id` | Eliminar cliente |

### Dispositivos (entidad principal con populate)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/v1/devices?page=1&limit=10` | Listar dispositivos (paginado con cliente populado) |
| GET | `/api/v1/devices/:id` | Obtener dispositivo con datos del cliente |
| POST | `/api/v1/devices` | Crear dispositivo (requiere customerId) |
| PUT | `/api/v1/devices/:id` | Actualizar dispositivo |
| DELETE | `/api/v1/devices/:id` | Eliminar dispositivo |

## Respuesta con Populate

```json
{
  "_id": "abc123...",
  "brand": "Samsung",
  "model": "Galaxy S23",
  "issue": "Pantalla rota",
  "status": "IN_REPAIR",
  "estimatedCost": 350000,
  "customer": {
    "_id": "def456...",
    "name": "Juan Pérez",
    "phone": "3151234567",
    "email": "juan@email.com"
  },
  "entryDate": "2026-06-20T00:00:00.000Z"
}
```

## Paginación

```
GET /api/v1/devices?page=1&limit=5
```

```json
{
  "data": [...],
  "total": 6,
  "page": 1,
  "totalPages": 2
}
```

## Manejo de Errores

| Código | Causa |
|--------|-------|
| 400 | ID inválido (CastError) |
| 404 | Recurso no encontrado |
| 409 | Campo único duplicado (error 11000) |

## Datos de Prueba (Seed)

El seed inserta:
- **3 clientes**: Juan Pérez, María García, Carlos López
- **6 dispositivos**: Samsung Galaxy S23, iPhone 14 Pro, Xiaomi Redmi Note 12, Motorola Edge 30, Samsung Galaxy A14, iPhone 13
