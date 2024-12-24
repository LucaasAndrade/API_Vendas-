import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import AppError from '../errors/appError';
import '../typeorm';
import { errors } from 'celebrate';
import upload from '../../config/upload';

const app = express();

app.use(cors());
app.use('/files', express.static(upload.directory));
app.use(express.json());

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

app.listen(3030, () => {
  console.log('Servidor online! Porta: ' + 3030);
});
