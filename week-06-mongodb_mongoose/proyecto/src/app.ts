import express from 'express';
import customerRouter from './routes/customer.routes';
import deviceRouter from './routes/device.routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

export const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/v1/customers', customerRouter);
app.use('/api/v1/devices',   deviceRouter);

app.use(notFound);
app.use(errorHandler);
