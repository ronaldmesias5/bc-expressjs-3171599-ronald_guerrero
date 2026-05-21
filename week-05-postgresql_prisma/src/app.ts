import 'dotenv/config';
import express from 'express';
import customerRoutes from './routes/customer.routes.js';
import deviceRoutes from './routes/device.routes.js';
import partRoutes from './routes/part.routes.js';
import repairRoutes from './routes/repair.routes.js';
import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());

app.use('/api/customers', customerRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/parts', partRoutes);
app.use('/api/repairs', repairRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
