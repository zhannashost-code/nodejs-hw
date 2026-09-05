import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { errors } from 'celebrate';

import { connectMongoDB } from './db/connectMongoDB.js';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRouter from './routes/authRoutes.js';
import notesRouter from './routes/notesRoutes.js';

dotenv.config();

const app = express();

app.use(logger);
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/notes', notesRouter);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

const port = Number(process.env.PORT) || 3000;

const startServer = async () => {
  await connectMongoDB();
  app.listen(port, () => console.log(`Server running on ${port} port`));
};

startServer();
