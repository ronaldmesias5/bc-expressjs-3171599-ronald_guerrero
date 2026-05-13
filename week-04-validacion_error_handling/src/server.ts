// ============================================
// SERVER — Entry point
// ============================================
import app from './app.js';
import type { Server } from 'http';
import { logger } from './config/logger.js';

const PORT = process.env['PORT'] ? Number(process.env['PORT']) : 3000;

let server: Server;

function start(): void {
  server = app.listen(PORT, () => {
    logger.info('╔══════════════════════════════════════════════════════════╗');
    logger.info('║   TIENDA DE REPARACIÓN DE CELULARES — Week 04          ║');
    logger.info('╠══════════════════════════════════════════════════════════╣');
    logger.info(`║  🚀 Server running at http://localhost:${PORT}           ║`);
    logger.info('║                                                          ║');
    logger.info('║  Features: Zod · AppError · Winston · Morgan             ║');
    logger.info('╚══════════════════════════════════════════════════════════╝');
  });

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
}

function gracefulShutdown(signal: string): void {
  logger.warn(`${signal} received. Shutting down gracefully...`);
  server.close(() => {
    logger.info('✅ Server closed');
    process.exit(0);
  });
  setTimeout(() => {
    logger.error('⚠️  Forcing shutdown after 10s');
    process.exit(1);
  }, 10000);
}

start();
