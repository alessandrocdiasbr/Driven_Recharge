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

app.get("/health", (req: express.Request, res: express.Response) => {
  res.status(200).send();
});


app.use(phoneRoutes);
app.use(rechargeRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;