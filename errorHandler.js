import httpStatus from 'http-status';
import config from './configs/index.js';
import logger from './logger.js';
import pinoLogger from './pinoLogger.js';

export class CustomError extends Error {
  constructor(errorMessage, statusCode, isVerboseDisabled = false) {
    super(errorMessage);
    this.errorMessage = errorMessage;
    this.statusCode = statusCode;
    this.isVerboseDisabled = isVerboseDisabled;
    Error.captureStackTrace(this, this.constructor); // TODO: use more accurate stack trace
  }
}

export function catchAsyncRuntimeException(controller) {
  // immediately returns anon function
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      const customError = new CustomError(
        error.message || httpStatus['500_NAME'].replaceAll('_', ' '), // TODO: use i18n
        error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
        error.isVerboseDisabled || false,
      );
      next(customError);
    }
  };
}

export function pageNotFoundHandler(req, res) {
  res.send({
    message: httpStatus['404_NAME'].replaceAll('_', ' '),
    status: httpStatus.NOT_FOUND,
  });
}

// eslint-disable-next-line no-unused-vars
export function globalErrorHandler(error, req, res, next) {
  if (error.isVerboseDisabled && config.NODE_ENV === config.PRODUCTION) {
    pinoLogger.error(error.message); // add simple console logging
  } else {
    logger.log('error', error); // add verbose file logging
  }
  res.send({
    message: httpStatus['500_NAME'].replaceAll('_', ' '),
    status: httpStatus.INTERNAL_SERVER_ERROR,
  });
}
