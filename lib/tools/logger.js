"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const winston_1 = tslib_1.__importStar(require("winston"));
class Logger {
    static createLogger(transports) {
        if (!this.logger) {
            this.logger = winston_1.default.createLogger({
                level: 'debug',
                transports: [
                    ...(transports || []),
                    new winston_1.default.transports.Console({
                        format: winston_1.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple()),
                    }),
                ],
            });
            this.logger.info('Winston logging initiated');
        }
        return this.logger;
    }
}
exports.default = Logger;
//# sourceMappingURL=logger.js.map