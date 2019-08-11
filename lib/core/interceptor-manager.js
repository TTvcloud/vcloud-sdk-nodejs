"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const util_1 = require("util");
// import Client from '..';
class InterceptorManager {
    constructor(
    // private readonly client: Client
    ) {
        this._preHandlers = [];
        this._postHandlers = [];
    }
    checkIntercetor(...args) {
        assert_1.default(args.some(arg => util_1.isFunction(arg)), 'interceptor should have at least one function as parameter.');
    }
    get preHandlers() {
        return this._preHandlers;
    }
    get postHandlers() {
        return this._postHandlers;
    }
    //新增前置拦截器
    addPreHandler(handler) {
        const { resolve, reject } = handler;
        this.checkIntercetor(resolve, reject);
        this._preHandlers.push({
            resolve,
            reject,
        });
    }
    //新增后置拦截器
    addPostHandler(handler) {
        const { resolve, reject } = handler;
        this.checkIntercetor(resolve, reject);
        this._postHandlers.push({
            resolve,
            reject,
        });
    }
}
exports.default = InterceptorManager;
//# sourceMappingURL=interceptor-manager.js.map