import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { calculationRouter } from './routes/calculations';
import { userRouter } from './routes/users';
import { mealRouter } from './routes/meals';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/calculations', calculationRouter);
app.use('/api/users', userRouter);
app.use('/api/meals', mealRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'Diet Calculator API is running!' });
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📊 Diet Calculator API v1.0.0`);
});

export default app;
