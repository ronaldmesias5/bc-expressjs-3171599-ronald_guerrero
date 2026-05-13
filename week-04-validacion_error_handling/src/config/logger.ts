// ============================================
// CONFIG — Logger Winston + Morgan stream
// ============================================
import { createLogger, format, transports } from 'winston';
import morgan from 'morgan';

const isDev = process.env['NODE_ENV'] !== 'production';

export const logger = createLogger({
  level: isDev ? 'http' : 'warn',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    isDev
      ? format.combine(
          format.colorize(),
          format.printf(({ level, message, timestamp }) =>
            `${String(timestamp)} [${level}]: ${String(message)}`
          )
        )
      : format.json()
  ),
  transports: [
    new transports.Console(),
    ...(isDev
      ? []
      : [new transports.File({ filename: 'logs/error.log', level: 'error' })]),
  ],
});

const morganStream = {
  write: (message: string) => logger.http(message.trim()),
};

const morganFormat = isDev ? 'dev' : 'combined';
export const morganMiddleware = morgan(morganFormat, { stream: morganStream });
