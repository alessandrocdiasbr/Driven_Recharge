import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import phoneRoutes from './routes/phone.routes';
import rechargeRoutes from './routes/recharge.routes';
import { errorHandler } from './middlewares/error.middleware';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get('/health', (req: express.Request, res: express.Response) => {
  res.status(200).send('OK');
});

app.use('/api/phones', phoneRoutes);
app.use('/api/recharges', rechargeRoutes);

console.log("Rotas registradas:");


app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  errorHandler(error, req, res, next);
});

app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
