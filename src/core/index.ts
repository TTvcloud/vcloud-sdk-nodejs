import * as AWS from '../tools/v4';
import * as util from '../tools/util';
import * as sts2 from '../tools/sts2';
import _debug from 'debug';
import assert from 'assert';
import InterceptorManager from './interceptor-manager';
import qs from 'querystring';
import Query from './query';
import { ClientConfigs, FetchOptions, RequestOptions, Policy, SecurityToken2 } from '../models/service';
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
};

const defaultPolicy = {
  Statement: [
    {
      Effect: 'Allow',
      Action: ['*'],
      Resource: ['*'],
    },
  ],
};

const defaultExpire = 60 * 60 * 1000;

class Client {
  private readonly _configs: ClientConfigs;
  private _manager: InterceptorManager;

  constructor(configs: ClientConfigs) {
    this._configs = this.initConfigs(configs);
    this._manager = new InterceptorManager();
  }

  initConfigs(configs: ClientConfigs) {
    const endpoint = configs.endpoint || 'https://open.bytedanceapi.com';

    assert(configs, 'must provide client config');
    assert(configs.accesskey, 'must provide accesskey');
    assert(configs.secretkey, 'must provide secretKey');

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

    //校验version、endpoint
    const version = options.version || this._configs.version;
    const endpoint = this._configs.endpoint;
    const service = this._configs.service;
    assert(version, 'must provide api version');
    assert(endpoint, 'must provide endpoint');
    assert(service, 'must provide service');
    if (endpoint) {
      assert(
        endpoint.startsWith('http://') || endpoint.startsWith('https://'),
        'endpoint only support http or https protocol',
      );
    }

    const query = {
      Action: util.firstToUpperCase(action),
      Version: version,
      ...options.query,
    };

    const url = `${endpoint}?${qs.stringify(query)}`;
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

    const signer = new AWS.AWSSignersV4(fetchOptions, service, {});

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

  /**
   * 端上调用OpenApi之前获取临时aksk的方法
   * @param  {Policy|number} inlinePolicy? 权限策略
   * @param  {number} expire? 过期时间
   * @returns SecurityToken2 包含临时ak/sk的对象
   */
  SignSts2(inlinePolicy?: Policy | number, expire?: number): SecurityToken2 {
    if (!inlinePolicy) inlinePolicy = defaultPolicy;
    if (typeof inlinePolicy === 'number') {
      expire = inlinePolicy;
      inlinePolicy = defaultPolicy;
    }
    if (!expire) expire = defaultExpire;
    assert(typeof expire === 'number', 'SignSts2 second parameter must be a number');

    const nowTime = Date.now();
    const CurrentTime = new Date(nowTime).toLocaleString();
    const timeInMilles = Date.now() + expire;
    const timeInSeconds = parseInt((timeInMilles / 1000).toFixed(0));
    const ExpiredTime = new Date(timeInMilles).toLocaleString();

    const { AccessKeyId, SecretAccessKey } = sts2.CreateTempAKSK();
    const sts = { AccessKeyId, SecretAccessKey };

    const innerToken = sts2.CreateInnerToken(this._configs, sts, inlinePolicy, timeInSeconds);
    const SessionToken = 'STS2' + sts2.base64(JSON.stringify(innerToken));

    return {
      CurrentTime,
      ExpiredTime,
      SessionToken,
      AccessKeyId,
      SecretAccessKey,
    };
  }
}

export default Client;
