import { PostHandler, PreHandler } from '../models/interceptor';
export default class InterceptorManager {
    private _preHandlers;
    private _postHandlers;
    constructor();
    checkIntercetor(...args: any[]): void;
    readonly preHandlers: Partial<{
        resolve: (p: import("../models/interceptor").PreResolve) => any;
        reject: (e: Error) => any;
    }>[];
    readonly postHandlers: Partial<{
        resolve: (p: any) => any;
        reject: (e: Error) => any;
    }>[];
    addPreHandler(handler: PreHandler): void;
    addPostHandler(handler: PostHandler): void;
}
