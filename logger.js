import { createLogger, transports, format } from 'winston';

const logger = createLogger({
  transports: [
    new transports.File({
      filename: 'winston.error.log',
      level: 'error',
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: 'winston.fatal.log',
      level: 'fatal',
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

export default logger;
