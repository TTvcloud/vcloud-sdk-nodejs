"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const ajv_1 = tslib_1.__importDefault(require("../tools/ajv"));
const util_1 = require("../tools/util");
const Schemas_1 = require("../constant/Schemas");
const debug = debug_1.default('openapi-format-response');
function formatResponse(config) {
    return async (res) => {
        debug('validateRes...');
        const { needMetaData, needHeaders } = config;
        const contentType = util_1.getHeader(res.headers, 'content-type');
        //限定json类型
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error(JSON.stringify({
                message: `error: 错误的返回数据类型 ${contentType}`,
                code: res.status,
                body: await res.text(),
            }));
        }
        let ret = await res.json();
        const ajvInst = ajv_1.default();
        if (!res.ok) {
            // throw new Error(JSON.stringify({ message: `${res.status} ${res.statusText}`, code: res.status, body: ret }));
            throw new Error(JSON.stringify({ code: res.status, body: ret.ResponseMetadata.Error.Message }));
        }
        if (!(ajvInst.validate(Schemas_1.ResponseSuccSchema, ret) || ajvInst.validate(Schemas_1.ResponseFailedSchema, ret))) {
            throw new Error(`返回数据${JSON.stringify(ret, null, 2)}不符合openAPI通用数据规范`);
        }
        if (ret['ResponseMetadata']['Error']) {
            throw new Error(JSON.stringify(ret));
        }
        if (!needMetaData) {
            ret = ret['Result'];
        }
        if (needHeaders) {
            ret = { body: ret, headers: res.headers.raw() };
        }
        return ret;
    };
}
exports.formatResponse = formatResponse;
//# sourceMappingURL=format-response.js.map