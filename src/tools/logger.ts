import TransportStream from 'winston-transport';
import winston, { format } from 'winston';

class Logger {
  private static logger: winston.Logger;

  static createLogger(transports?: TransportStream[]) {
    if (!this.logger) {
      this.logger = winston.createLogger({
        level: 'debug',
        transports: [
          ...(transports || []),
          new winston.transports.Console({
            format: format.combine(winston.format.colorize(), winston.format.simple()),
          }),
        ],
      });

      this.logger.info('Winston logging initiated');
    }
    return this.logger;
  }
}

export default Logger;
