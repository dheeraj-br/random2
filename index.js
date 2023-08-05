import express from 'express';
import httpStatus from 'http-status';
import morgan from 'morgan';
import configs from './configs/index.js';
import {
  CustomError,
  catchAsyncRuntimeException,
  globalErrorHandler,
  pageNotFoundHandler,
} from './errorHandler.js';
import logger from './logger.js';
import pinoLogger from './pinoLogger.js';

process.on('uncaughtException', (error) => {
  // only catches errors outside of routes
  logger.log('error', 'uncaught exception, exiting app', error); // write to file, verbose
  pinoLogger.error(error.message); // console log, short
  // TODO: gracefully shutdown
  setTimeout(() => {
    process.exit(1);
  }, 1000); // allow time to write logs and run clean up code
});

const app = express();

app.use(morgan('combined')); // console logs every request made to app

// NOTE: keeping structure absolutely basic to focus on central error handling

app.get('/errorHandler', () => {
  const customError = new CustomError(
    httpStatus['503_NAME'].replaceAll('_', ' '),
    httpStatus[503],
    true,
  );
  throw customError; // Express will catch this, if error handler is absent
});

app.get(
  '/catchBlock',
  catchAsyncRuntimeException(async () => {
    throw new Error('exception'); // catch block inside hof will catch this
  }),
);

app.get('/exceptionAsUnhandledRejection', async () => {
  throw new Error('exception'); // exception inside async, unhandledRejection is thrown, process listener will catch this
});

app.get('/unhandledRejection', () => {
  Promise.reject(new Error('rejected')); // unhandledRejection is thrown, process listener will catch this
});

app.all('*', pageNotFoundHandler);

app.use(globalErrorHandler);

const server = app.listen(configs.PORT);

process.on('unhandledRejection', (error) => {
  // catches uncaught promises from entire app
  logger.log('error', 'uncaught exception, exiting app', error); // write to file, verbose
  pinoLogger.error(error.message); // console log, short
  // TODO: gracefully shutdown
  server.close(() => {
    process.exit(1);
  });
});
