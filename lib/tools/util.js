"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const performance_now_1 = tslib_1.__importDefault(require("performance-now"));
const node_fetch_1 = require("node-fetch");
const url_1 = require("url");
/**
 * 格式判断相关方法
 * @param fn
 */
function isFunc(fn) {
    return typeof fn === 'function';
}
exports.isFunc = isFunc;
function isUndefined(t) {
    return typeof t === 'undefined' || t === null;
}
exports.isUndefined = isUndefined;
function isPromise(t) {
    return t instanceof Promise;
}
exports.isPromise = isPromise;
function isArray(t) {
    if (Array.isArray)
        return Array.isArray(t);
    return Object.prototype.toString.call(t).slice(8, 13) === 'Array';
}
exports.isArray = isArray;
function isHandler(t) {
    if (typeof t === 'object'
        && (typeof t.resolve === 'function' || typeof t.reject === 'function'))
        return true;
    return false;
}
exports.isHandler = isHandler;
function flatArray(t) {
    if (!t || !isArray(t))
        return t;
    return t.reduce((o, a) => {
        isArray(a) ? (o = o.concat(flatArray(a))) : o.push(a);
        return o;
    }, []);
}
exports.flatArray = flatArray;
function excuteWaterful(tasks) {
    const _tasks = flatArray(tasks);
    return _tasks.reduce((h, p) => {
        if (isUndefined(h))
            return Promise.resolve();
        if (isPromise(p))
            return p;
        if (isFunc(p))
            return h.then(p);
        if (isHandler(p))
            return h.then(p.resolve, p.reject);
        return Promise.resolve(p);
    });
}
exports.excuteWaterful = excuteWaterful;
/**
 * 获取指定名称的请求头
 * @param  {{[key:string]:string}|Headers} headers 请求头集合
 * @param  {string} name 查询名称
 */
function getHeader(headers, name) {
    if (headers instanceof node_fetch_1.Headers) {
        return headers.get(name.toLowerCase());
    }
    return headers[Object.keys(headers).find(key => key.toLowerCase() === name.toLowerCase()) || ''];
}
exports.getHeader = getHeader;
/**
 * 将指定字符串首位字符置为大写, 并返回新的字符串
 * @param  {string} name
 */
function firstToUpperCase(name) {
    if (typeof name !== 'string')
        return name;
    return name.slice(0, 1).toUpperCase() + name.slice(1);
}
exports.firstToUpperCase = firstToUpperCase;
function formatParams(params) {
    const nextParams = {};
    Object.keys(params).forEach(key => {
        nextParams[firstToUpperCase(key)] = params[key];
    });
    return nextParams;
}
exports.formatParams = formatParams;
function formatHeaders(headers) {
    if (!headers)
        return {};
    return Object.keys(headers).reduce((obj, key) => {
        obj[key.toLowerCase()] = headers[key];
        return obj;
    }, {});
}
exports.formatHeaders = formatHeaders;
function formatQuery(query) {
    return Object.keys(query).reduce((obj, key) => {
        obj[key] = encodeURIComponent(query[key]);
        return obj;
    }, {});
}
exports.formatQuery = formatQuery;
function formatBody(options) {
    let body = '';
    if (!options || !options.body)
        return body;
    const contentType = (options.headers && options.headers['content-type']) || '';
    if (contentType.match(/application\/json/i)) {
        return JSON.stringify(body);
    }
    else {
        if (Object.keys(body).length > 0) {
            const params = new url_1.URLSearchParams();
            Object.keys(body).forEach(key => body[key] && params.append(key, body[key]));
            return params;
        }
    }
    return body;
}
exports.formatBody = formatBody;
/**
 * getUs函数 获得一个us时间值
 */
function getUs() {
    return (performance_now_1.default() * 1000) << 0;
}
exports.getUs = getUs;
//# sourceMappingURL=util.js.map