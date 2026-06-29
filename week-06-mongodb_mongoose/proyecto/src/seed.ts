import 'dotenv/config';
import { connectDB, disconnectDB } from './lib/mongoose';
import { Customer } from './models/customer.model';
import { Device } from './models/device.model';

async function seed(): Promise<void> {
  await connectDB();

  // Limpiar colecciones (orden inverso al de inserción)
  await Device.deleteMany({});
  await Customer.deleteMany({});
  console.log('Collections cleared');

  // Paso A: Insertar clientes primero y capturar sus _id
  const [juan, maria, carlos] = await Customer.insertMany([
    { name: 'Juan Pérez', phone: '3151234567', email: 'juan@email.com', address: 'Carrera 1 #2-3' },
    { name: 'María García', phone: '3107654321', email: 'maria@email.com', address: 'Calle 100 #10-20' },
    { name: 'Carlos López', phone: '3009876543', email: 'carlos@email.com', address: 'Av. Siempre Viva #45' },
  ]);
  console.log('Customers inserted');

  // Paso B: Insertar dispositivos referenciando los _id de los clientes
  await Device.insertMany([
    {
      brand: 'Samsung',
      model: 'Galaxy S23',
      issue: 'Pantalla rota por caída',
      status: 'IN_REPAIR',
      estimatedCost: 350000,
      customer: juan._id,
      entryDate: new Date('2026-06-20'),
    },
    {
      brand: 'iPhone',
      model: '14 Pro',
      issue: 'Batería no carga, posible cambio de batería',
      status: 'PENDING',
      estimatedCost: 250000,
      customer: maria._id,
      entryDate: new Date('2026-06-22'),
    },
    {
      brand: 'Xiaomi',
      model: 'Redmi Note 12',
      issue: 'No enciende, posible problema de placa',
      status: 'COMPLETED',
      estimatedCost: 180000,
      finalCost: 200000,
      customer: carlos._id,
      entryDate: new Date('2026-06-18'),
      exitDate: new Date('2026-06-25'),
    },
    {
      brand: 'Motorola',
      model: 'Edge 30',
      issue: 'Puerto de carga dañado',
      status: 'IN_REPAIR',
      estimatedCost: 120000,
      customer: juan._id,
      entryDate: new Date('2026-06-23'),
    },
    {
      brand: 'Samsung',
      model: 'Galaxy A14',
      issue: 'Pin de carga roto dentro del puerto USB',
      status: 'DELIVERED',
      estimatedCost: 80000,
      finalCost: 80000,
      customer: maria._id,
      entryDate: new Date('2026-06-15'),
      exitDate: new Date('2026-06-17'),
    },
    {
      brand: 'iPhone',
      model: '13',
      issue: 'Micrófono no funciona en llamadas',
      status: 'PENDING',
      estimatedCost: 150000,
      customer: carlos._id,
      entryDate: new Date('2026-06-26'),
    },
  ]);
  console.log('Seed completed: 3 customers + 6 devices inserted');

  await disconnectDB();
}

seed().catch((err: unknown) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
