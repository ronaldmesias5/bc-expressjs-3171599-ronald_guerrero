# Week 07 — Autenticación JWT

Sistema de autenticación completo para la **tienda de reparación de celulares** con registro, login, refresh tokens y rutas protegidas, integrado con el recurso `Device`.

## Stack Técnico

- Node.js 22+ / Express 5.1.0 / TypeScript 5.8.3
- Mongoose 9.4.1 / MongoDB 7 (Docker)
- Zod 4.3.6 / bcrypt 5.1.1 / jsonwebtoken 9.0.2
- cookie-parser 1.4.7

## Estructura

```
src/
├── lib/mongoose.ts              # Conexión a MongoDB
├── models/
│   ├── user.model.ts            # Schema de usuario (email, password, role, refreshToken)
│   └── device.model.ts          # Schema de dispositivo con createdBy
├── schemas/
│   ├── auth.schema.ts           # Validación Zod para register/login
│   └── device.schema.ts         # Validación Zod para dispositivo
├── repositories/
│   ├── users.repository.ts      # Operaciones de usuario
│   └── device.repository.ts     # CRUD de dispositivos
├── services/
│   ├── auth.service.ts          # register, login, refresh, logout, getMe
│   └── device.service.ts        # CRUD de dispositivos
├── controllers/
│   ├── auth.controller.ts       # Handlers de autenticación
│   └── device.controller.ts     # Handlers de dispositivos
├── routes/
│   ├── auth.routes.ts           # Rutas de autenticación
│   └── device.routes.ts         # Rutas protegidas de dispositivos
├── middlewares/
│   ├── auth.middleware.ts       # Verifica JWT de la cookie
│   ├── errorHandler.ts          # Manejo global de errores
│   └── notFound.ts              # Ruta no encontrada
├── utils/jwt.ts                 # sign/verify de access y refresh tokens
├── types/express.d.ts           # Extensión de req.user
├── errors/AppError.ts           # Clase de error personalizada
├── app.ts                       # Configuración Express
└── server.ts                    # Entry point
```

## Configuración

```bash
# 1. Copiar variables de entorno
cp .env.example .env

# 2. Editar .env con secretos JWT (generar con: openssl rand -base64 64)
#    JWT_ACCESS_SECRET=<secreto_para_access_token>
#    JWT_REFRESH_SECRET=<secreto_para_refresh_token>

# 3. Levantar MongoDB con Docker
docker compose up -d

# 4. Instalar dependencias
pnpm install

# 5. Iniciar servidor
pnpm dev
```

Servidor en `http://localhost:3000`

## Endpoints de Autenticación

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/api/v1/auth/register` | ❌ | Registrar nuevo usuario |
| POST | `/api/v1/auth/login` | ❌ | Iniciar sesión (setea cookies) |
| POST | `/api/v1/auth/refresh` | ❌ | Renovar tokens con refresh token |
| GET | `/api/v1/auth/me` | ✅ | Obtener perfil del usuario autenticado |
| POST | `/api/v1/auth/logout` | ✅ | Cerrar sesión (limpia cookies) |

## Endpoints Protegidos (Dispositivos)

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/api/v1/devices` | ✅ | Listar todos los dispositivos |
| GET | `/api/v1/devices/:id` | ✅ | Obtener dispositivo por ID |
| POST | `/api/v1/devices` | ✅ | Crear nuevo dispositivo |
| PATCH | `/api/v1/devices/:id` | ✅ | Actualizar dispositivo |
| DELETE | `/api/v1/devices/:id` | ✅ | Eliminar dispositivo |

## Flujo de Autenticación

### Registro
```
POST /api/v1/auth/register
Body: { "email": "test@test.com", "password": "Test1234!", "name": "Test User" }
→ 201 Created
```

### Login
```
POST /api/v1/auth/login
Body: { "email": "test@test.com", "password": "Test1234!" }
→ 200 OK + Set-Cookie: accessToken (HttpOnly, 15min)
         + Set-Cookie: refreshToken (HttpOnly, 7d)
```

### Acceso a ruta protegida
```
GET /api/v1/devices
Cookie: accessToken=eyJ...
→ 200 OK (lista de dispositivos)
```

### Renovar tokens
```
POST /api/v1/auth/refresh
Cookie: refreshToken=eyJ...
→ 200 OK + nuevas cookies
```

### Logout
```
POST /api/v1/auth/logout
Cookie: accessToken=eyJ...
→ 200 OK + cookies eliminadas
```

## Seguridad

- **Contraseñas**: hasheadas con bcrypt (salt rounds = 10)
- **Access token**: 15 minutos de duración, firmado con `JWT_ACCESS_SECRET`
- **Refresh token**: 7 días de duración, firmado con `JWT_REFRESH_SECRET` (secreto distinto)
- **Cookies HttpOnly**: no accesibles desde JavaScript (previene XSS)
- **Rotación de refresh tokens**: cada refresh genera un nuevo par y el anterior se invalida
- **Hash del refresh token**: almacenado en DB, nunca el token en texto plano
- **User enumeration prevention**: mismo mensaje de error para email no encontrado y contraseña incorrecta

## Variables de Entorno

```
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://bootcamp:bootcamp123@localhost:27017/bootcamp_auth_dev?authSource=admin
JWT_ACCESS_SECRET=<generar con openssl rand -base64 64>
JWT_REFRESH_SECRET=<generar con openssl rand -base64 64>
```
