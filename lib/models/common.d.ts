export declare type ResponseMetadata = {
    RequestId: string;
    Service: string;
    Region: string;
    Action: string;
    Version: string;
    Error?: ErrorObj;
};
export declare type ErrorObj = {
    Code: string;
    Message: string;
};
export declare type CommonResponse = {
    ResponseMetadata: ResponseMetadata;
    Resultl: any;
};
export declare type BaseResp = {
    Status: string;
    CreatedTime: number;
    UpdatedTime: number;
};
