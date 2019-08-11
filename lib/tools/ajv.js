"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ajv_1 = tslib_1.__importDefault(require("ajv"));
let instance;
exports.default = (options) => {
    if (!instance) {
        instance = new ajv_1.default(options || { allErrors: true });
    }
    return instance;
};
//# sourceMappingURL=ajv.js.map