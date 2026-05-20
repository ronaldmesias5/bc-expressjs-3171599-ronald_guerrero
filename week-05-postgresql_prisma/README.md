# Week 05 - PostgreSQL + Prisma

Proyecto de ejemplo para la semana 05 usando Express, TypeScript y Prisma con PostgreSQL.

## Configuración

1. Copia el archivo de ambiente:
   ```bash
   cp .env.example .env
   ```
2. Ajusta `DATABASE_URL` con tus credenciales de PostgreSQL.
3. Instala dependencias:
   ```bash
   pnpm install
   ```
4. Ejecuta la migración inicial:
   ```bash
   pnpm prisma:migrate
   ```
5. Inicia la aplicación:
   ```bash
   pnpm dev
   ```

## Endpoints

- `GET /api/customers`
- `GET /api/customers/:id`
- `POST /api/customers`
- `PUT /api/customers/:id`
- `DELETE /api/customers/:id`

- `GET /api/devices`
- `GET /api/devices/:id`
- `POST /api/devices`
- `PUT /api/devices/:id`
- `DELETE /api/devices/:id`

- `GET /api/parts`
- `GET /api/parts/:id`
- `POST /api/parts`
- `PUT /api/parts/:id`
- `DELETE /api/parts/:id`

- `GET /api/repairs`
- `GET /api/repairs/:id`
- `POST /api/repairs`
- `PUT /api/repairs/:id`
- `DELETE /api/repairs/:id`

## Notas

- Usa `prisma studio` para inspeccionar la base de datos:
  ```bash
  pnpm prisma:studio
  ```
