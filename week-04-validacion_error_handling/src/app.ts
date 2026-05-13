// ============================================
// APP — Configuración Express
// ============================================
import express from 'express';
import { morganMiddleware } from './config/logger.js';
import deviceRoutes from './routes/device.routes.js';
import repairRoutes from './routes/repair.routes.js';
import partRoutes from './routes/part.routes.js';
import customerRoutes from './routes/customer.routes.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app: import('express').Express = express();

// 1. Middlewares generales
app.use(express.json());
app.use(morganMiddleware);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root
app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Phone Repair Shop API — Week 04',
    version: '1.0.0',
    features: ['Zod validation', 'AppError', 'Global error handler', 'Winston logging'],
    endpoints: {
      devices: '/api/v1/devices',
      repairs: '/api/v1/repairs',
      parts: '/api/v1/parts',
      customers: '/api/v1/customers',
      health: '/health',
    },
  });
});

// 2. Rutas
app.use('/api/v1/devices', deviceRoutes);
app.use('/api/v1/repairs', repairRoutes);
app.use('/api/v1/parts', partRoutes);
app.use('/api/v1/customers', customerRoutes);

// 3. 404 handler (después de rutas)
app.use(notFound);

// 4. Error handler global (siempre último)
app.use(errorHandler);

export default app;
