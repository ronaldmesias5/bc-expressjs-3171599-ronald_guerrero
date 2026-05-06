# Week 03 — REST API Arquitectura en Capas

API REST de tienda de reparación de celulares con arquitectura en **4 capas**:

```
routes → controllers → services → repositories
```

## Arquitectura

| Capa | Responsabilidad |
|------|-----------------|
| **Routes** | Definir endpoints y delegar al controller |
| **Controllers** | Recibir petición HTTP, llamar service, enviar respuesta |
| **Services** | Lógica de negocio (cálculos, reglas, transformaciones) |
| **Repositories** | Acceso único a datos (en memoria) |

## Estructura

```
src/
├── types/               # Interfaces y DTOs tipados
├── middleware/          # Logger, 404, error handler
├── routes/              # Endpoints Express
├── controllers/         # Thin controllers (solo orquestan)
├── services/            # Lógica de negocio
├── repositories/        # Acceso a datos en memoria
├── app.ts               # Configuración Express
└── server.ts            # Entry point
```

## Entidades

- **Device** — Dispositivos ingresados a la tienda
- **Repair** — Reparaciones realizadas
- **Part** — Repuestos / piezas en inventario
- **Customer** — Clientes registrados

## Contratos REST

### Respuesta exitosa (listado)
```json
{
  "success": true,
  "data": [...],
  "total": 10
}
```

### Respuesta exitosa (individual)
```json
{
  "success": true,
  "data": { ... }
}
```

### Respuesta de error
```json
{
  "success": false,
  "error": "Error message"
}
```

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/v1/devices` | Listar dispositivos |
| GET | `/api/v1/devices/:id` | Obtener dispositivo |
| POST | `/api/v1/devices` | Crear dispositivo |
| PUT | `/api/v1/devices/:id` | Actualizar dispositivo |
| DELETE | `/api/v1/devices/:id` | Eliminar dispositivo |
| GET | `/api/v1/repairs` | Listar reparaciones |
| GET | `/api/v1/repairs/:id` | Obtener reparación |
| POST | `/api/v1/repairs` | Crear reparación |
| PUT | `/api/v1/repairs/:id` | Actualizar reparación |
| DELETE | `/api/v1/repairs/:id` | Eliminar reparación |
| GET | `/api/v1/parts` | Listar repuestos |
| GET | `/api/v1/parts/:id` | Obtener repuesto |
| POST | `/api/v1/parts` | Crear repuesto |
| PUT | `/api/v1/parts/:id` | Actualizar repuesto |
| DELETE | `/api/v1/parts/:id` | Eliminar repuesto |
| GET | `/api/v1/customers` | Listar clientes |
| GET | `/api/v1/customers/:id` | Obtener cliente |
| POST | `/api/v1/customers` | Crear cliente |
| PUT | `/api/v1/customers/:id` | Actualizar cliente |
| DELETE | `/api/v1/customers/:id` | Eliminar cliente |

## Ejecución

```bash
pnpm install
pnpm dev      # desarrollo
pnpm build    # compilar TypeScript
pnpm start    # producción
```

Servidor en `http://localhost:3000`
