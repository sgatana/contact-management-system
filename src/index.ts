import express from 'express';
// import cookieParser from 'cookier-parser';
// import compression from 'compression';
import cors from 'cors';
import connectDb from './config/db';
import errorHandler from './middlewares/errorHandler';
import authRouter from './routes/auth';
import contactRoutes from './routes/contacts';

// initialize mongoDb connection
connectDb();

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);

app.use(errorHandler as any)
app.use('/v1/auth', authRouter);
app.use('/v1/contacts', contactRoutes);
const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
