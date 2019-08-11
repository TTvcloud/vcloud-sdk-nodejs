"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const util = tslib_1.__importStar(require("../tools/util"));
class Query extends Error {
    constructor(chain) {
        super();
        this.chain = chain;
        Error.captureStackTrace(this, this.constructor);
    }
    exec() {
        return util.excuteWaterful(this.chain).catch((e) => {
            const message = e.stack.split('\n')[0];
            if (this.stack) {
                const stack = this.stack.split('\n').slice(2).join('\n');
                e.stack = message + '\n' + stack;
            }
            throw e;
        });
    }
}
exports.default = Query;
//# sourceMappingURL=query.js.map