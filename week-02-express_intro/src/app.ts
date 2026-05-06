import express, { type Express, type Request, type Response, type NextFunction, type ErrorRequestHandler } from 'express';
import deviceRoutes from './routes/devices.routes.js';
import repairRoutes from './routes/repairs.routes.js';
import partRoutes from './routes/parts.routes.js';
import customerRoutes from './routes/customers.routes.js';

const app: Express = express();

// ============================================
// Middleware de logging personalizado
// ============================================

interface LoggerRequest extends Request {
  startTime?: number;
}

const loggerMiddleware = (req: LoggerRequest, res: Response, next: NextFunction): void => {
  const start = Date.now();
  req.startTime = start;
  
  // Escuchar el evento 'finish' para capturar el status code final
  res.on('finish', () => {
    const duration = Date.now() - start;
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url} - Status: ${res.statusCode} - ${duration}ms`);
  });
  
  next();
};

// ============================================
// Middlewares esenciales
// ============================================

// 1. Logging (primero para capturar todas las peticiones)
app.use(loggerMiddleware);

// 2. Parseo de JSON
app.use(express.json());

// ============================================
// Rutas de la API
// ============================================

app.use('/api/v1/devices', deviceRoutes);
app.use('/api/v1/repairs', repairRoutes);
app.use('/api/v1/parts', partRoutes);
app.use('/api/v1/customers', customerRoutes);

// Ruta de health check
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Ruta raíz
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Bienvenido a la API de Tienda de Reparación de Celulares',
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

// ============================================
// Handler 404 - Rutas no encontradas
// ============================================

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada',
    message: 'El endpoint solicitado no existe. Consulta / para ver los endpoints disponibles.'
  });
});

// ============================================
// Error handler global - SIEMPRE ÚLTIMO
// ============================================

const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] Error:`, err.message);
  console.error(err.stack);
  
  // No enviar detalles del error en producción
  const isDev = process.env.NODE_ENV === 'development';
  
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor',
    message: isDev ? err.message : 'Ocurrió un error inesperado. Por favor intenta más tarde.',
    ...(isDev && { stack: err.stack })
  });
};

app.use(errorHandler);

export default app;
