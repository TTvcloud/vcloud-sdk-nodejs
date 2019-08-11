/// <reference types="node" />
import { Headers } from 'node-fetch';
import { URLSearchParams } from 'url';
/**
 * 格式判断相关方法
 * @param fn
 */
declare function isFunc(fn: any): boolean;
declare function isUndefined(t: any): boolean;
declare function isPromise(t: any): boolean;
declare function isArray(t: any): boolean;
declare function isHandler(t: any): boolean;
declare function flatArray(t: any): any;
declare function excuteWaterful(tasks: any): any;
/**
 * 获取指定名称的请求头
 * @param  {{[key:string]:string}|Headers} headers 请求头集合
 * @param  {string} name 查询名称
 */
declare function getHeader(headers: {
    [key: string]: string;
} | Headers, name: string): string | null;
/**
 * 将指定字符串首位字符置为大写, 并返回新的字符串
 * @param  {string} name
 */
declare function firstToUpperCase(name: string): string;
declare function formatParams(params: any): {};
declare function formatHeaders(headers: any): {};
declare function formatQuery(query: any): {};
declare function formatBody(options: any): string | URLSearchParams;
/**
 * getUs函数 获得一个us时间值
 */
declare function getUs(): number;
export { isFunc, isUndefined, isPromise, isArray, isHandler, flatArray, excuteWaterful, getHeader, firstToUpperCase, formatParams, formatHeaders, formatQuery, formatBody, getUs, };
