# Ejercicio 02 — Populate: Productos con Categorías

Extensión del ejercicio anterior que agrega la entidad `Category` y relaciona productos con categorías usando `Schema.Types.ObjectId` y `.populate()`.

## Stack Técnico

- Node.js 22+ / Express 5.1.0 / TypeScript 5.8.3
- Mongoose 9.4.1 / MongoDB 7 (Docker)
- Zod 4.3.6

## Requisitos Previos

- Ejercicio 01 completado
- Docker Desktop instalado y corriendo

## Configuración

```bash
# 1. Copiar variables de entorno
cp .env.example .env

# 2. Levantar MongoDB con Docker
docker compose up -d

# 3. Instalar dependencias
pnpm install

# 4. Insertar datos de prueba (categorías + productos)
pnpm seed

# 5. Iniciar servidor
pnpm dev
```

Servidor en `http://localhost:3000`

## Endpoints

### Productos (con categoría populada)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/v1/products?page=1&limit=10&search=` | Listar productos con categoría |
| GET | `/api/v1/products/:id` | Obtener producto con categoría |
| POST | `/api/v1/products` | Crear producto (requiere categoryId) |
| PUT | `/api/v1/products/:id` | Actualizar producto |
| DELETE | `/api/v1/products/:id` | Eliminar producto |

### Categorías

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/v1/categories` | Listar categorías |
| GET | `/api/v1/categories/:id` | Obtener categoría |
| POST | `/api/v1/categories` | Crear categoría |
| PUT | `/api/v1/categories/:id` | Actualizar categoría |
| DELETE | `/api/v1/categories/:id` | Eliminar categoría |

## Relación

```
categories              products
┌─────────────────┐     ┌──────────────────────────────┐
│ _id: ObjectId   │◄────│ category: Schema.Types.ObjectId│
│ name: string    │     │ name: string                  │
│ createdAt: Date │     │ price: number                 │
└─────────────────┘     │ sku: string (unique)          │
                        └──────────────────────────────┘
```

## Ejemplo de Respuesta con Populate

```json
{
  "_id": "...",
  "name": "Camiseta Polo Blanca",
  "price": 59900,
  "category": {
    "_id": "...",
    "name": "Ropa"
  }
}
```
