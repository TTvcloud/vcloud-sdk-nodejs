"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = tslib_1.__importDefault(require("../index"));
const logger_1 = tslib_1.__importDefault(require("../tools/logger"));
const logger = logger_1.default.createLogger();
const client = new index_1.default({
    accesskey: 'xxx',
    secretkey: 'xxx',
    version: '2018-11-19',
    service: 'ecs',
    endpoint: 'http://10.225.126.01',
});
client.addPreHandler({
    resolve: function (p) {
        logger.info(p.action, p.options);
    }
}).addPostHandler({
    resolve: function (r) {
        logger.info('result: ', r);
        return r;
    },
    reject: function (e) {
        logger.error('reject: ', e);
    }
});
client.request('GetKeypairs', {
    query: {
        'X-Account-Id': 1,
    },
}).then(res => {
    console.log(res);
}).catch(e => {
    console.error(e);
});
//# sourceMappingURL=simple.js.map