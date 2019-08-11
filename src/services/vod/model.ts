import { CommonResponse, ResponseMetadata } from '../../models/common';

export const VideoFormat = {
  MP4: 'mp4',
  M3U8: 'm3u8'
}

export const FileTypes = {
  VIDEO: 'video',
  IMAGE: 'image',
  OBJECT: 'object'
}

export const VideoDefinition = {
  D1080P: "1080p",
  D720P: "720p",
  D540P: "540p",
  D480P: "480p",
  D360P: "360p",
  D240P: "240p"
}

type StringMap = {
  [k: string]: string
}

type VideoDefinition = string
type VideoFormat = string
export type FileType = 'video' | 'image' | 'object';

// export type FileType

export type GetPlayInfoResp = {
  ResponseMetadata: ResponseMetadata
  Result: GetPlayInfoData
}

type GetPlayInfoData = {
  Data: GetPlayInfoInner
}

type GetPlayInfoInner = {
  Status: number
  VideoID: string
  CoverUrl: string
  Duration: Number
  MediaType: string
  TotalCount: number
  PlayInfoList: Array<PlayInfo>
}

type PlayInfo = {
  Bitrate: number
  FileHash: string
  Size: number
  Height: number
  Width: number
  Format: string
  Codec: string
  Logo: string
  Definition: string
  Quality: string
  PlayAuth: string
  MainPlayUrl: string
  BackupPlayUrl: string
  FileID: string
  P2pVerifyURL: string
  PreloadInterval: number
  PreloadMaxStep: number
  PreloadMinStep: number
  PreloadSize: number
}

export type GetOriginVideoPlayInfoResp = {
  ResponseMetadata: ResponseMetadata
  Result: GetOriginVideoPlayInfoData
}

type GetOriginVideoPlayInfoData = {
  MediaType: string
  Duration: number
  Size: number
  Height: number
  Width: number
  Format: string
  CodecType: string
  Bitrate: number
  FileHash: string
  MainPlayUrl: string
  BackupPlayUrl: string
}

export type StartTranscodeRequest = {
  Vid: string
  TemplateId: string
  // Input: map[string]interface{ }
  Priority: number
}

type StartTranscodeResult = {
  RunId: string
}

export type StartTranscodeResp = {
  ResponseMetadata: ResponseMetadata
  Result: StartTranscodeResult
}

type UploadMediaByUrlResult = {
  Code: number
  Message: string
}

export type UploadMediaByUrlResp = CommonResponse & {
  Result: UploadMediaByUrlResult
}



export type UploadMediaByUrlParams = {
  SpaceName: string
  Format: VideoFormat
  SourceUrls: Array<string>
  CallbackArgs: string
}



export type ApplyUploadParam = {
  SpaceName: string
  SessionKey: string
  FileType: FileType
  FileSize: number
  UploadNum: number
}

export type ApplyUploadResp = CommonResponse & {
  Result: ApplyUploadResult
}

type ApplyUploadResult = {
  RequestID: string
  UploadAddress: UploadAddress
}

type UploadAddress = {
  StoreInfos: Array<StoreInfo>
  UploadHosts: Array<string>
  UploadHeader: StringMap
  SessionKey: string
  AdvanceOption: AdvanceOption
}



export type RedirectPlayParam = {
  Vid: string
  Definition: VideoDefinition
  Watermark: string
  Expires: string
}

type StoreInfo = {
  StoreUri: string
  Auth: string
}

type AdvanceOption = {
  Parallel: number
  Stream: number
  SliceSize: number
}

export type ModifyVideoInfoBody = {
  SpaceName: string
  Vid: string
  Info: UserMetaInfo
  Tags: TagControl
}

type UserMetaInfo = {
  Title: string
  Description: string
  Category: string
  PosterUri: string
}

type TagControl = {
  Deletes: string
  Adds: string
}

export type ModifyVideoInfoResp = {
  ResponseMetadata: ResponseMetadata
  Result: ModifyVideoInfoBaseResp
}

type ModifyVideoInfoBaseResp = {
  BaseResp: BaseResp
}

type BaseResp = {
  StatusMessage: string
  StatusCode: number
}

export type CommitUploadParam = {
  SpaceName: string
  Body: CommitUploadBody
}

type CommitUploadBody = {
  CallbackArgs: string
  SessionKey: string
  Functions: Array<Function>
}

type Function = {
  Name: string
  // Input: interface{ }
}

export type SnapshotInput = {
  SnapshotTime: number
}

export type EntryptionInput = {
  Config: StringMap
  PolicyParams: StringMap
}

export type OptionInfo = {
  Title: string
  Tags: string
  Description: string
  Category: string
}

export type WorkflowInput = {
  TemplateId: string
}

export type CommitUploadResp = CommonResponse & {
  Result: CommitUploadResult
}

type CommitUploadResult = {
  RequestId: string
  Results: Array<UploadResult>
}

type UploadResult = {
  Vid: string
  VideoMeta: VideoMeta
  ImageMeta: ImageMeta
  ObjectMeta: ObjectMeta
  Encryption: Encryption
  SnapshotUri: string
}
type VideoMeta = {
  Uri: string
  Height: number
  Width: number
  Duration: number
  Md5: string
  Bitrate: number
  Format: string
  Size: number
}

type ImageMeta = {
  Uri: string
  Height: number
  Width: number
  Md5: string
}

type ObjectMeta = {
  Uri: string
  Md5: string
}

type Encryption = {
  Uri: string
  SecretKey: string
  Algorithm: string
  Version: string
  SourceMd5: string
  Extra: StringMap
}

export type SetVideoPublishStatusResp = {
  ResponseMetadata: ResponseMetadata
}

export type GetWeightsResp = {
  ResponseMetadata: ResponseMetadata
  Result: {
    [k: string]: {
      [p: string]: number
    }
  }
}

export type DomainInfo = {
  MainDomain: string
  BackupDomain: string
}

export type ImgUrl = {
  MainUrl: string
  BackupUrl: string
}