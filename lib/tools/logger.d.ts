import TransportStream from 'winston-transport';
import winston from 'winston';
declare class Logger {
    private static logger;
    static createLogger(transports?: TransportStream[]): winston.Logger;
}
export default Logger;
