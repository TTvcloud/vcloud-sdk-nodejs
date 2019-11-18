import { IncomingHttpHeaders } from 'http';
import { RequestInit } from 'node-fetch';

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
}

//请求配置
export type RequestOptions = Partial<{
  method: string;
  version: string;
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

export interface SecurityToken2 {
  AccessKeyId: string;
  SecretAccessKey: string;
  ExpiredTime: string;
  SessionToken?: string;
}

export interface InnerToken {
  LTAccessKeyId: string;
  AccessKeyId: string;
  SignedSecretAccessKey: string;
  ExpiredTime: number;
  PolicyString: string;
  Signature: string;
}

export interface Policy {
  Statement: Statement[];
}

export interface Statement {
  Effect: string;
  Action: string[];
  Resource: string[];
  Condition?: string;
}

export type FetchOptions = RequestOptions & {
  pathname: () => string;
  search: () => string;
  path: string;
  region: string;
  url: string;
  timeout: number;
};

export interface ExtendRequestInit extends RequestInit {
  url: string;
  query?: {
    [key: string]: any;
  };
}
