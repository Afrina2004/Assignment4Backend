

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import HttpStatus from 'http-status';
import router from './app/routes';

const app: Application = express();
app.use(express.json()); // parses application/json
app.use(express.urlencoded({ extended: true })); // parses form data
app.use(cookieParser());
app.use(cors({ origin: [
  'https://bicyclestore.netlify.app',
  'http://localhost:5173'
], credentials: true })); // *

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
    try {
      res.status(200).send({
        success: true,
        message: 'Server is running! ⚡',
      });
    } catch (err: any) {
      res.status(500).send({
        message: err.message || 'Something went wrong!',
        success: false,
        error: err.errors,
        stack: err.stack,
      });
    }
  });

app.use(globalErrorHandler);

// route not found
app.use('*', (req: Request, res: Response) => {
    res.status(HttpStatus.FORBIDDEN).send({
      success: false,
      message: 'Route not found!',
      status: HttpStatus.FORBIDDEN,
    });
  });

// api not found
app.use(notFound as any);

export default app;
