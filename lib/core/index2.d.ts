/// <reference types="node" />
import { ClientConfigs, RequestOptions } from '../models/service';
import { PostHandler, PreHandler } from '../models/interceptor';
declare class Client {
    private readonly _configs;
    private _manager;
    constructor(configs: ClientConfigs);
    initConfigs(configs: ClientConfigs): {
        endpoint: string;
        accesskey: string;
        secretkey: string;
        version: string;
        service: string;
        region?: string | undefined;
        headers?: import("http").IncomingHttpHeaders | undefined;
        needMetaData?: boolean | undefined;
        timeout?: number | undefined;
        needHeaders?: boolean | undefined;
        callCluster?: string | undefined;
        logger?: object | undefined;
        defaultConfigs: {
            needMetaData: boolean;
            needHeaders: boolean;
            callCluster: string;
            timeout: number;
            logger: import("winston").Logger;
        };
    };
    /**
     * 替换endpoint,一般搭配consul的watcher使用
     * @param  {string} end: new endpoint
     */
    setEndpoint(end: string): void;
    /**
     * 替换默认logger
     */
    setLogger(logger: any): void;
    /**
     * 添加前后置拦截器
     */
    addPreHandler(handler: PreHandler): this;
    addPostHandler(handler: PostHandler): this;
    /**
     * @param action //请求的openapi的方法名
     * @param options //请求方法类型、参数、headers、配置相关
     */
    request(action: any, options?: RequestOptions): Promise<never>;
}
export default Client;
