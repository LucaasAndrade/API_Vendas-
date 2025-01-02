import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import AppError from '../errors/appError';
import '../typeorm';
import { errors } from 'celebrate';
import upload from '../../config/upload';
import { pagination } from 'typeorm-pagination';
import rateLimit from '../middlewares/rateLimiter';

const app = express();

app.use(cors());
app.use(express.json());

app.use(rateLimit);

app.use('/files', express.static(upload.directory));

app.use(pagination);

app.use(routes);
app.use(errors());

app.use(
  (
    error: Error,
    _request: Request,
    response: Response,
    next: NextFunction,
  ): any => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    console.error(error);
    return response.status(500).json({
      status: 'error',
      message: error.message,
    });
  },
);

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log('Servidor online! Porta: ' + port);
});
