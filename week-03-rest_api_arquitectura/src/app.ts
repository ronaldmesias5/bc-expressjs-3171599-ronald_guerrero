import express, { type Express } from 'express';
import { loggerMiddleware } from './middleware/logger.middleware.js';
import { notFoundHandler } from './middleware/notFound.middleware.js';
import { errorHandler } from './middleware/error.middleware.js';
import deviceRoutes from './routes/device.routes.js';
import repairRoutes from './routes/repair.routes.js';
import partRoutes from './routes/part.routes.js';
import customerRoutes from './routes/customer.routes.js';

const app: Express = express();

// 1. Logger
app.use(loggerMiddleware);

// 2. JSON parse
app.use(express.json());

// 3. Routes
app.use('/api/v1/devices', deviceRoutes);
app.use('/api/v1/repairs', repairRoutes);
app.use('/api/v1/parts', partRoutes);
app.use('/api/v1/customers', customerRoutes);

// Health check
app.get('/health', (_req, res) => {
  res.status(200).json({ success: true, message: 'API OK', timestamp: new Date().toISOString() });
});

// Root
app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Phone Repair Shop API',
    version: '1.0.0',
    endpoints: {
      devices: '/api/v1/devices',
      repairs: '/api/v1/repairs',
      parts: '/api/v1/parts',
      customers: '/api/v1/customers',
      health: '/health'
    }
  });
});

// 4. 404 handler
app.use(notFoundHandler);

// 5. Error handler (always last)
app.use(errorHandler);

export default app;
