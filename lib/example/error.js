"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = tslib_1.__importDefault(require("../index"));
const client = new index_1.default({
    accesskey: 'AKLTNTUyZmI4MGY0MDQ2NDg5ZWI1MGRjN2QxZTI0MDIyM2Q',
    secretkey: 'xZLJM0y4NcfzpaINI8l1g0xveaTw0N6sj/xeAqIRvoq2PStZcbSy331TrNB4C9Mn',
    version: '2019-03-04',
    service: 'ecs',
    endpoint: 'http://10.225.126.59:9436',
});
client.request('GetKeypairs', {
    query: {
        'X-Account-Id': 1,
    },
}).catch(e => {
    console.error(e);
});
//# sourceMappingURL=error.js.map