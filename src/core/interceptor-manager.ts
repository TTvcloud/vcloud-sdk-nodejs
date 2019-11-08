import assert from 'assert';
import { isFunction } from 'util';
import { PostHandler, PreHandler } from '../models/interceptor';
// import Client from '..';

export default class InterceptorManager {
  private _preHandlers: PreHandler[] = [];
  private _postHandlers: PostHandler[] = [];

  constructor() // private readonly client: Client
  {}

  public checkIntercetor(...args) {
    assert(args.some(arg => isFunction(arg)), 'interceptor should have at least one function as parameter.');
  }

  public get preHandlers() {
    return this._preHandlers;
  }

  public get postHandlers() {
    return this._postHandlers;
  }

  //新增前置拦截器
  public addPreHandler(handler: PreHandler) {
    const { resolve, reject } = handler;
    this.checkIntercetor(resolve, reject);
    this._preHandlers.push({
      resolve,
      reject,
    });
  }

  //新增后置拦截器
  public addPostHandler(handler: PostHandler) {
    const { resolve, reject } = handler;
    this.checkIntercetor(resolve, reject);
    this._postHandlers.push({
      resolve,
      reject,
    });
  }
}
