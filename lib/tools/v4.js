"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const global_1 = tslib_1.__importDefault(require("aws-sdk/global"));
const uriEscape = (str) => {
    try {
        return encodeURIComponent(str)
            .replace(/[^A-Za-z0-9_.~\-%]+/g, escape)
            .replace(/[*]/g, ch => `%${ch
            .charCodeAt(0)
            .toString(16)
            .toUpperCase()}`);
    }
    catch (e) {
        return '';
    }
};
const queryParamsToString = (params) => Object.keys(params)
    .sort()
    .map(key => {
    const val = params[key];
    if (typeof val === 'undefined' || val === null)
        return;
    const escapedKey = uriEscape(key);
    if (!escapedKey)
        return;
    if (Array.isArray(val)) {
        return `${escapedKey}=${val
            .map(uriEscape)
            .sort()
            .join(`&${escapedKey}=`)}`;
    }
    return `${escapedKey}=${uriEscape(val)}`;
})
    .filter(v => v)
    .join('&');
exports.queryParamsToString = queryParamsToString;
const AWSSignersV4 = global_1.default.Signers.V4;
exports.AWSSignersV4 = AWSSignersV4;
//# sourceMappingURL=v4.js.map