import * as AWS from '../tools/v4';
import * as util from '../tools/util';
import _debug from 'debug';
import assert from 'assert';
import InterceptorManager from './interceptor-manager';
import Logger from '../tools/logger';
import qs from 'querystring';
import Query from './query';
import { ClientConfigs, FetchOptions, RequestOptions } from '../models/service';
import { dispatchRequest } from './dispatch-request';
import { formatResponse } from './format-response';
import { PostHandler, PreHandler } from '../models/interceptor';
import { REGION } from '../constant/index';

const debug = _debug('openapi-core');

const defaultConfigs = {
  needMetaData: false,
  needHeaders: false,
  callCluster: 'default',
  timeout: 5000,
  logger: Logger.createLogger(),
};

class Client {
  private readonly _configs: ClientConfigs;
  private _manager: InterceptorManager;

  constructor(configs: ClientConfigs) {
    this._configs = this.initConfigs(configs);
    this._manager = new InterceptorManager();
  }

  initConfigs(configs: ClientConfigs) {
    const endpoint = configs.endpoint;

    assert(configs, 'must provide client config');
    assert(configs.accesskey, 'must provide accesskey');
    assert(configs.secretkey, 'must provide secretKey');
    assert(configs.version, 'must provide api version');
    assert(endpoint, 'must provide endpoint');
    assert(
      endpoint.startsWith('http://') || endpoint.startsWith('https://'),
      'endpoint only support http or https protocol',
    );

    return {
      defaultConfigs,
      ...configs,
      endpoint: endpoint.endsWith('/') ? endpoint.slice(0, -1) : endpoint,
    };
  }

  /**
   * 替换endpoint,一般搭配consul的watcher使用
   * @param  {string} end: new endpoint
   */
  setEndpoint(end: string) {
    this._configs.endpoint = end;
  }

  /**
   * 替换默认logger
   */
  setLogger(logger) {
    assert(logger, 'logger is invalid');
    this._configs.logger = logger;
  }

  /**
   * 添加前后置拦截器
   */
  addPreHandler(handler: PreHandler) {
    this._manager.addPreHandler(handler);
    return this;
  }

  addPostHandler(handler: PostHandler) {
    this._manager.addPostHandler(handler);
    return this;
  }

  /**
   * @param action //请求的openapi的方法名
   * @param options //请求方法类型、参数、headers、配置相关
   */
  async request(action, options: RequestOptions = {}) {
    let isLockTime = options.lockTime;

    if (options.query) {
      Object.keys(options.query).forEach(key => {
        if (options.query![key] instanceof Date) {
          options.query![key] = options.query![key].toISOString();
        }
      });
    }

    options.headers = {
      'content-type': 'application/x-www-form-urlencoded',
      ...util.formatHeaders(options.headers),
    };

    const query = {
      Action: util.firstToUpperCase(action),
      Version: options.version || this._configs.version,
      ...options.query,
    };

    const url = `${this._configs.endpoint}?${qs.stringify(query)}`;
    const method = (options.method || 'GET').toUpperCase();
    const body = util.formatBody(options);

    if (!['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      throw new Error(`UnSupported Method: ${method}`);
    }

    const fetchOptions: FetchOptions = {
      timeout: this._configs.timeout!,
      pathname: () => '/',
      path: '/',
      ...options,
      region: this._configs.region || REGION.CnNorth1,
      method: method,
      search: () => `${AWS.queryParamsToString(query)}`,
      query: util.formatQuery(query),
      url,
      body,
    };

    debug('fetchOptions: %o', fetchOptions);

    const signer = new AWS.AWSSignersV4(fetchOptions, this._configs.service, {});

    debug('this._configs', this._configs);
    signer.addAuthorization(
      {
        accessKeyId: this._configs.accesskey,
        secretAccessKey: this._configs.secretkey,
      },
      !isLockTime ? new Date() : new Date('2018-09-06T02:50:18.315Z'),
    );

    const chain = [
      Promise.resolve({ action, options }),
      ...this._manager.preHandlers,
      dispatchRequest(fetchOptions),
      formatResponse(this._configs),
      ...this._manager.postHandlers,
    ];

    return new Query(chain).exec();
  }
}

export default Client;
