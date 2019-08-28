import _debug from 'debug';
import { CoreOptions } from 'request';
import requestPromise from 'request-promise';
import { FetchOptions } from '../models/service';

const debug = _debug('openapi-request');

function dispatchRequest(options: FetchOptions) {
  return () => {
    const { method, url, headers, body, logId = '', timeout } = options;

    const reqOptions: CoreOptions = {
      body: method === 'GET' || method === 'HEAD' ? undefined : body,
      method,
      timeout,
      headers: {
        'x-tt-logid': logId,
        ...headers,
      },
    };

    debug('reqOptions: ', reqOptions);

    return requestPromise({uri: url, ...reqOptions});
  }
}

export { dispatchRequest };
