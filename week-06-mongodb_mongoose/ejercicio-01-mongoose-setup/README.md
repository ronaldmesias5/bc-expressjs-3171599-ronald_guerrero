# Ejercicio 01 — Mongoose Setup: CRUD de Productos

API CRUD de productos conectada a MongoDB con Mongoose, que incluye schema con validadores, paginación y manejo de errores específicos de MongoDB (11000 y CastError).

## Stack Técnico

- Node.js 22+ / Express 5.1.0 / TypeScript 5.8.3
- Mongoose 9.4.1 / MongoDB 7 (Docker)
- Zod 4.3.6

## Requisitos Previos

- Docker Desktop instalado y corriendo
- pnpm instalado

## Configuración

```bash
# 1. Copiar variables de entorno
cp .env.example .env

# 2. Levantar MongoDB con Docker
docker compose up -d

# 3. Instalar dependencias
pnpm install

# 4. Insertar datos de prueba
pnpm seed

# 5. Iniciar servidor
pnpm dev
```

Servidor en `http://localhost:3000`

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/v1/products?page=1&limit=10&search=` | Listar productos (paginado) |
| GET | `/api/v1/products/:id` | Obtener producto por ID |
| POST | `/api/v1/products` | Crear producto |
| PUT | `/api/v1/products/:id` | Actualizar producto |
| DELETE | `/api/v1/products/:id` | Eliminar producto |

## Esquema del Producto

| Campo | Tipo | Validación |
|-------|------|------------|
| name | String | Requerido, max 100, trim |
| description | String | Opcional, max 500 |
| price | Number | Requerido, min 0 |
| stock | Number | Default 0, min 0 |
| sku | String | Requerido, unique, uppercase, trim |
| active | Boolean | Default true |

## Manejo de Errores

| Código | Causa |
|--------|-------|
| 400 | ID inválido (CastError) |
| 404 | Producto no encontrado |
| 409 | SKU duplicado (error 11000) |
