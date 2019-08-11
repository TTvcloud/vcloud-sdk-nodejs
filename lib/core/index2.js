"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const AWS = tslib_1.__importStar(require("../tools/v4"));
const util = tslib_1.__importStar(require("../tools/util"));
const debug_1 = tslib_1.__importDefault(require("debug"));
const assert_1 = tslib_1.__importDefault(require("assert"));
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const interceptor_manager_1 = tslib_1.__importDefault(require("./interceptor-manager"));
const logger_1 = tslib_1.__importDefault(require("../tools/logger"));
const querystring_1 = tslib_1.__importDefault(require("querystring"));
const index_1 = require("../constant/index");
const debug = debug_1.default('openapi-core');
const defaultConfigs = {
    needMetaData: false,
    needHeaders: false,
    callCluster: 'default',
    timeout: 5000,
    logger: logger_1.default.createLogger(),
};
class Client {
    // private logger: object;
    constructor(configs) {
        this._configs = this.initConfigs(configs);
        this._manager = new interceptor_manager_1.default();
        // this._manager = new InterceptorManager(this);
        // this.logger = configs.logger || Logger.createLogger(configs.transports);
    }
    initConfigs(configs) {
        const endpoint = configs.endpoint;
        assert_1.default(configs, 'must provide client config');
        assert_1.default(configs.accesskey, 'must provide accesskey');
        assert_1.default(configs.secretkey, 'must provide secretKey');
        assert_1.default(configs.version, 'must provide api version');
        assert_1.default(endpoint, 'must provide endpoint');
        assert_1.default(endpoint.startsWith('http://') || endpoint.startsWith('https://'), 'endpoint only support http or https protocol');
        return Object.assign({ defaultConfigs }, configs, { endpoint: endpoint.endsWith('/') ? endpoint.slice(0, -1) : endpoint });
    }
    /**
     * 替换endpoint,一般搭配consul的watcher使用
     * @param  {string} end: new endpoint
     */
    setEndpoint(end) {
        this._configs.endpoint = end;
    }
    /**
     * 替换默认logger
     */
    setLogger(logger) {
        assert_1.default(logger, 'logger is invalid');
        this._configs.logger = logger;
    }
    /**
     * 添加前后置拦截器
     */
    addPreHandler(handler) {
        this._manager.addPreHandler(handler);
        return this;
    }
    addPostHandler(handler) {
        this._manager.addPostHandler(handler);
        return this;
    }
    /**
     * @param action //请求的openapi的方法名
     * @param options //请求方法类型、参数、headers、配置相关
     */
    async request(action, options = {}) {
        let isLockTime = options.lockTime;
        if (options.query) {
            Object.keys(options.query).forEach(key => {
                if (options.query[key] instanceof Date) {
                    options.query[key] = options.query[key].toISOString();
                }
            });
        }
        options.headers = Object.assign({ 'content-type': 'application/x-www-form-urlencoded' }, util.formatHeaders(options.headers));
        const query = Object.assign({ Action: util.firstToUpperCase(action), Version: options.version || this._configs.version }, options.query);
        const url = `${this._configs.endpoint}?${querystring_1.default.stringify(query)}`;
        const method = (options.method || 'GET').toUpperCase();
        const body = util.formatBody(options);
        if (!['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
            throw new Error(`UnSupported Method: ${method}`);
        }
        const fetchOptions = Object.assign({ timeout: this._configs.timeout, pathname: () => '/', path: '/' }, options, { region: this._configs.region || index_1.REGION.CnNorth1, method: method, search: () => `${AWS.queryParamsToString(query)}`, query: util.formatQuery(query), url,
            body });
        debug('fetchOptions: %o', fetchOptions);
        const signer = new AWS.AWSSignersV4(fetchOptions, this._configs.service, {});
        debug('this._configs', this._configs);
        signer.addAuthorization({
            accessKeyId: this._configs.accesskey,
            secretAccessKey: this._configs.secretkey,
        }, !isLockTime ? new Date() : new Date('2018-09-06T02:50:18.315Z'));
        // const chain = [
        //   Promise.resolve({ action, options }),
        //   ...this._manager.preHandlers,
        //   dispatchRequest(fetchOptions),
        //   formatResponse(this._configs),
        //   ...this._manager.postHandlers
        // ];
        // return util.excuteWaterful(chain);
        const { headers, logId = '' } = fetchOptions;
        // const res = await fetch(fetchOptions.url, {
        //   body: method === 'GET' || method === 'HEAD' ? undefined : fetchOptions.body,
        //   method: fetchOptions.method,
        //   headers: {
        //     'x-tt-logid': logId,
        //     ...headers,
        //   },
        // });
        // console.trace();
        // throw new Error(JSON.stringify({ code: res.status, body: 'asdasdas' }));
        return node_fetch_1.default(fetchOptions.url, {
            body: method === 'GET' || method === 'HEAD' ? undefined : fetchOptions.body,
            method: fetchOptions.method,
            headers: Object.assign({ 'x-tt-logid': logId }, headers),
        }).then(res => {
            throw new Error(JSON.stringify({ code: res.status, body: `${fetchOptions.url} Error` }));
        });
    }
}
exports.default = Client;
//# sourceMappingURL=index2.js.map