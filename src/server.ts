import app from './app.js';

const PORT = process.env.PORT || 3000;

// ============================================
// Iniciar servidor
// ============================================

const server = app.listen(PORT, () => {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║     TIENDA DE REPARACIÓN DE CELULARES - API REST          ║');
  console.log('╠══════════════════════════════════════════════════════════╣');
  console.log(`║  🚀 Servidor ejecutándose en http://localhost:${PORT}    ║`);
  console.log('║                                                          ║');
  console.log('║  Endpoints disponibles:                                  ║');
  console.log('║    • GET  /api/v1/devices        (Dispositivos)          ║');
  console.log('║    • GET  /api/v1/repairs        (Reparaciones)          ║');
  console.log('║    • GET  /api/v1/parts          (Repuestos)             ║');
  console.log('║    • GET  /api/v1/customers      (Clientes)              ║');
  console.log('║    • GET  /health                (Health Check)          ║');
  console.log('╚══════════════════════════════════════════════════════════╝');
});

// ============================================
// Graceful shutdown
// ============================================

const gracefulShutdown = (signal: string): void => {
  console.log(`\n${signal} recibido. Cerrando servidor gracefulmente...`);
  
  server.close(() => {
    console.log('✅ Servidor cerrado correctamente');
    console.log('👋 Hasta luego!');
    process.exit(0);
  });
  
  // Forzar cierre después de 10 segundos si no se cierra gracefulmente
  setTimeout(() => {
    console.error('⏱️  No se pudo cerrar gracefulmente en 10s, forzando cierre...');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Manejo de errores no capturados
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
