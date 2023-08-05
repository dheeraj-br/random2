import express from 'express';
import httpStatus from 'http-status';
import configs from './configs/index.js';
import {
  CustomError,
  catchAsyncRuntimeException,
  globalErrorHandler,
  pageNotFoundHandler,
} from './errorHandler.js';

process.on('uncaughtException', () => {
  // only catches errors outside of routes
  // TODO: log error
  // TODO: gracefully shutdown
  process.exit(1);
});

const app = express();

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

process.on('unhandledRejection', () => {
  // catches uncaught promises from entire app
  // TODO: log error
  // TODO: gracefully shutdown
  server.close(() => {
    process.exit(1);
  });
});
