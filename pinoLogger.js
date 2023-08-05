import { pino } from 'pino';

const pinoLogger = pino({
  transport: { target: 'pino-pretty' },
});

export default pinoLogger;
