import now from 'performance-now';
import { Headers } from 'request';
import { URLSearchParams } from 'url';


/**
 * 格式判断相关方法
 * @param fn
 */
function isFunc(fn) {
  return typeof fn === 'function';
}

function isUndefined(t) {
  return typeof t === 'undefined' || t === null;
}

function isPromise(t) {
  return t instanceof Promise;
}

function isArray(t) {
  if (Array.isArray) return Array.isArray(t);
  return Object.prototype.toString.call(t).slice(8, 13) === 'Array';
}

function isHandler(t) {
  if (typeof t === 'object'
    && (
      typeof t.resolve === 'function' || typeof t.reject === 'function'
    )
  ) return true;
  return false;
}

function flatArray(t) {
  if (!t || !isArray(t)) return t;
  return t.reduce((o, a) => {
    isArray(a) ? (o = o.concat(flatArray(a))) : o.push(a);
    return o;
  }, []);
}


function excuteWaterful(tasks) {

  const _tasks = flatArray(tasks);

  return _tasks.reduce((h, p) => {
    if (isUndefined(h)) return Promise.resolve();
    if (isPromise(p)) return p;
    if (isFunc(p)) return h.then(p);
    if (isHandler(p)) return h.then(p.resolve, p.reject);
    return Promise.resolve(p);
  });
}


/**
 * 获取指定名称的请求头
 * @param  {{[key:string]:string}|Headers} headers 请求头集合
 * @param  {string} name 查询名称
 */
function getHeader(headers: { [key: string]: string } | Headers, name: string) {
  if (headers instanceof Headers) {
    return headers.get(name.toLowerCase());
  }
  return headers[Object.keys(headers).find(key => key.toLowerCase() === name.toLowerCase()) || ''];
}

/**
 * 将指定字符串首位字符置为大写, 并返回新的字符串
 * @param  {string} name
 */
function firstToUpperCase(name: string) {
  if (typeof name !== 'string') return name;
  return name.slice(0, 1).toUpperCase() + name.slice(1);
}

function formatParams(params) {
  const nextParams = {};
  Object.keys(params).forEach(key => {
    nextParams[firstToUpperCase(key)] = params[key];
  });
  return nextParams;
}

function formatHeaders(headers) {
  if (!headers) return {};
  return Object.keys(headers).reduce((obj, key) => {
    obj[key.toLowerCase()] = headers[key];
    return obj;
  }, {});
}

function formatQuery(query) {
  return Object.keys(query).reduce((obj, key) => {
    obj[key] = encodeURIComponent(query[key]);
    return obj;
  }, {});
}

function formatBody(options) {
  let body = '';
  if (!options || !options.body) return body;
  const contentType = (options.headers && options.headers['content-type']) || '';

  if (contentType.match(/application\/json/i)) {
    return JSON.stringify(body);
  } else {
    if (Object.keys(body).length > 0) {
      const params = new URLSearchParams();
      Object.keys(body).forEach(key => body[key] && params.append(key, body[key]));
      return params;
    }
  }
  return body;
}

/**
 * getUs函数 获得一个us时间值
 */
function getUs() {
  return (now() * 1000) << 0;
}

export {
  isFunc,
  isUndefined,
  isPromise,
  isArray,
  isHandler,
  flatArray,
  excuteWaterful,

  getHeader,
  firstToUpperCase,
  formatParams,
  formatHeaders,
  formatQuery,
  formatBody,
  getUs,
};
