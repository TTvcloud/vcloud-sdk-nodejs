import _debug from 'debug';
import fetch, { RequestInit } from 'node-fetch';
import { FetchOptions } from '../models/service';

const debug = _debug('openapi-request');

function dispatchRequest(options: FetchOptions) {
  return () => {
    const { method, url, headers, body, logId = '', timeout } = options;

    const reqOptions: RequestInit = {
      body: method === 'GET' || method === 'HEAD' ? undefined : body,
      method,
      timeout,
      headers: {
        'x-tt-logid': logId,
        ...headers,
      },
    };

    debug('reqOptions: ', reqOptions);

    return fetch(url, reqOptions);
  }
}

export { dispatchRequest };
