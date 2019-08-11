import { FetchOptions } from './service';
export declare type PreHandler = Partial<{
    resolve: (p: PreResolve) => any;
    reject: (e: Error) => any;
}>;
export declare type PostHandler = Partial<{
    resolve: (p: any) => any;
    reject: (e: Error) => any;
}>;
export declare type PreResolve = {
    action: string;
    options: FetchOptions;
};
