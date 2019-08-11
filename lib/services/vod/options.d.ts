export declare type Option = {
    isHttps: boolean;
    format: string;
    sigKey: string;
    tpl: string;
    w: any;
    h: number;
};
export interface OptionFun {
    (opt: Option): any;
}
