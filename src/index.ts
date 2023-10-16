import express from 'express';
import cors from 'cors';
import connectDb from './config/db';
import errorHandler from './middlewares/errorHandler';
import authRouter from './routes/auth';
import contactRoutes from './routes/contacts';
import { authMiddleware } from './middlewares/auth';

// initialize mongoDb connection
connectDb();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/v1/auth', authRouter);
app.use('/v1/contacts', authMiddleware, contactRoutes);
app.use(errorHandler as any);
const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
