"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const vod_1 = tslib_1.__importDefault(require("../services/vod"));
const client = new vod_1.default({
    accesskey: 'xxx',
    secretkey: 'xxx',
});
client.GetPlayInfo().then(res => {
    console.log(res);
}).catch(e => {
    console.error(e);
});
//# sourceMappingURL=vod.js.map