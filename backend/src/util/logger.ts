import { createLogger, format, transports, Logger } from 'winston';

const logger: Logger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [
    //new transports.File({ filename: 'error.log', level: 'error' }),
    //new transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'prod') {
  logger.add(new transports.Console({
    format: format.simple(),
  }));
}

export default logger;
