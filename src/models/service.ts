import { IncomingHttpHeaders } from 'http';
import { CoreOptions } from 'request';
import { RequestPromise } from 'request-promise';


export interface ClientCustomRequest {
  url: string,
  method?: string,
  body?: any,
  headers: {
    [key: string]: any
  },
}

//客户端配置
export interface ClientConfigs {
  accesskey: string;
  secretkey: string;
  endpoint: string;
  version: string;
  service: string;
  region?: string;
  headers?: IncomingHttpHeaders;

  needMetaData?: boolean;
  timeout?: number;
  needHeaders?: boolean;
  callCluster?: string;
  logger?: object;
  request?: (request: ClientCustomRequest) => RequestPromise;
}

//请求配置
export type RequestOptions = Partial<{
  version: string;
  method: string;
  path: string;
  logId: string;
  lockTime: boolean;
  body: any;
  query: {
    [key: string]: any;
  };
  headers: {
    [key: string]: string;
  };
}>;

export type FetchOptions = RequestOptions & {
  pathname: () => string;
  search: () => string;
  path: string;
  region: string;
  url: string;
  timeout: number;
};

export interface ExtendRequestInit extends CoreOptions {
  url: string;
  query?: {
    [key: string]: any;
  };
}
