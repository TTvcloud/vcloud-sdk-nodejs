"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const debug = debug_1.default('openapi-request');
function dispatchRequest(options) {
    return () => {
        const { method, url, headers, body, logId = '', timeout } = options;
        const reqOptions = {
            body: method === 'GET' || method === 'HEAD' ? undefined : body,
            method,
            timeout,
            headers: Object.assign({ 'x-tt-logid': logId }, headers),
        };
        debug('reqOptions: ', reqOptions);
        return node_fetch_1.default(url, reqOptions);
    };
}
exports.dispatchRequest = dispatchRequest;
//# sourceMappingURL=dispatch-request.js.map