export type ResponseMetadata = {
  RequestId: string
  Service: string
  Region: string
  Action: string
  Version: string
  Error?: ErrorObj
}

export type ErrorObj = {
  Code: string
  Message: string
}

export type CommonResponse = {
  ResponseMetadata: ResponseMetadata
  Resultl: any
}

export type BaseResp = {
  Status: string
  CreatedTime: number
  UpdatedTime: number
}



