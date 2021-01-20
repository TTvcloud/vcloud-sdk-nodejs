export interface ResponseMetadata {
  RequestId: string;
  Service: string;
  Region: string;
  Action: string;
  Version: string;
  Error?: ErrorObj;
}

export interface ErrorObj {
  Code: string;
  Message: string;
}

export interface CommonResponse {
  ResponseMetadata: ResponseMetadata;
  Result: unknown;
}

export interface BaseResp {
  Status: string;
  CreatedTime: number;
  UpdatedTime: number;
}
