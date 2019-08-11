/// <reference types="node" />
import { IncomingHttpHeaders } from 'http';
import { RequestInit } from 'node-fetch';
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
export declare type RequestOptions = Partial<{
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
export declare type FetchOptions = RequestOptions & {
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
