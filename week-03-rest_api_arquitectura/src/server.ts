import app from './app.js';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║     TIENDA DE REPARACIÓN DE CELULARES — Week 03          ║');
  console.log('╠══════════════════════════════════════════════════════════╣');
  console.log(`║  🚀 Server running at http://localhost:${PORT}           ║`);
  console.log('║                                                          ║');
  console.log('║  Architecture: routes → controllers → services → repos   ║');
  console.log('╚══════════════════════════════════════════════════════════╝');
});

function gracefulShutdown(signal: string): void {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
  setTimeout(() => {
    console.error('⚠️  Forcing shutdown after 10s');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
