import { CommonResponse, ResponseMetadata } from '../../models/common';

export const VideoFormat = {
  MP4: 'mp4',
  M3U8: 'm3u8',
};

export const FileTypes = {
  VIDEO: 'video',
  IMAGE: 'image',
  OBJECT: 'object',
};

export const VideoDefinition = {
  D1080P: '1080p',
  D720P: '720p',
  D540P: '540p',
  D480P: '480p',
  D360P: '360p',
  D240P: '240p',
};

interface StringMap {
  [k: string]: string;
}

type VideoDefinition = string;
type VideoFormat = string;
export type FileType = 'video' | 'image' | 'object';

// export type FileType

export interface GetPlayInfoResp {
  ResponseMetadata: ResponseMetadata;
  Result: GetPlayInfoData;
}

interface GetPlayInfoData {
  Data: GetPlayInfoInner;
}

interface GetPlayInfoInner {
  Status: number;
  VideoID: string;
  CoverUrl: string;
  Duration: number;
  MediaType: string;
  TotalCount: number;
  PlayInfoList: PlayInfo[];
}

interface PlayInfo {
  Bitrate: number;
  FileHash: string;
  Size: number;
  Height: number;
  Width: number;
  Format: string;
  Codec: string;
  Logo: string;
  Definition: string;
  Quality: string;
  PlayAuth: string;
  MainPlayUrl: string;
  BackupPlayUrl: string;
  FileID: string;
  P2pVerifyURL: string;
  PreloadInterval: number;
  PreloadMaxStep: number;
  PreloadMinStep: number;
  PreloadSize: number;
}

export interface GetOriginVideoPlayInfoResp {
  ResponseMetadata: ResponseMetadata;
  Result: GetOriginVideoPlayInfoData;
}

interface GetOriginVideoPlayInfoData {
  MediaType: string;
  Duration: number;
  Size: number;
  Height: number;
  Width: number;
  Format: string;
  CodecType: string;
  Bitrate: number;
  FileHash: string;
  MainPlayUrl: string;
  BackupPlayUrl: string;
}

export interface StartTranscodeRequest {
  Vid: string;
  TemplateId: string;
  // Input: map[string]interface{ }
  Priority: number;
}

interface StartTranscodeResult {
  RunId: string;
}

export interface StartTranscodeResp {
  ResponseMetadata: ResponseMetadata;
  Result: StartTranscodeResult;
}

interface UploadMediaByUrlResult {
  Code: number;
  Message: string;
}

export type UploadMediaByUrlResp = CommonResponse & {
  Result: UploadMediaByUrlResult;
};

export interface UploadMediaByUrlParams {
  SpaceName: string;
  Format: VideoFormat;
  SourceUrls: string[];
  CallbackArgs: string;
}

export interface ApplyUploadParam {
  SpaceName: string;
  SessionKey: string;
  FileType: FileType;
  FileSize: number;
  UploadNum: number;
}

export type ApplyUploadResp = CommonResponse & {
  Result: ApplyUploadResult;
};

interface ApplyUploadResult {
  RequestID: string;
  UploadAddress: UploadAddress;
}

interface UploadAddress {
  StoreInfos: StoreInfo[];
  UploadHosts: string[];
  UploadHeader: StringMap;
  SessionKey: string;
  AdvanceOption: AdvanceOption;
}

export interface RedirectPlayParam {
  Vid: string;
  Definition: VideoDefinition;
  Watermark: string;
  Expires: string;
}

interface StoreInfo {
  StoreUri: string;
  Auth: string;
}

interface AdvanceOption {
  Parallel: number;
  Stream: number;
  SliceSize: number;
}

export interface ModifyVideoInfoBody {
  SpaceName: string;
  Vid: string;
  Info: UserMetaInfo;
  Tags: TagControl;
}

interface UserMetaInfo {
  Title: string;
  Description: string;
  Category: string;
  PosterUri: string;
}

interface TagControl {
  Deletes: string;
  Adds: string;
}

export interface ModifyVideoInfoResp {
  ResponseMetadata: ResponseMetadata;
  Result: ModifyVideoInfoBaseResp;
}

interface ModifyVideoInfoBaseResp {
  BaseResp: BaseResp;
}

interface BaseResp {
  StatusMessage: string;
  StatusCode: number;
}

export interface CommitUploadParam {
  SpaceName: string;
  Body: CommitUploadBody;
}

interface CommitUploadBody {
  CallbackArgs: string;
  SessionKey: string;
  Functions: Function[];
}

interface Function {
  Name: string;
  // Input: interface{ }
}

export interface SnapshotInput {
  SnapshotTime: number;
}

export interface EntryptionInput {
  Config: StringMap;
  PolicyParams: StringMap;
}

export interface OptionInfo {
  Title: string;
  Tags: string;
  Description: string;
  Category: string;
}

export interface WorkflowInput {
  TemplateId: string;
}

export type CommitUploadResp = CommonResponse & {
  Result: CommitUploadResult;
};

interface CommitUploadResult {
  RequestId: string;
  Results: UploadResult[];
}

interface UploadResult {
  Vid: string;
  VideoMeta: VideoMeta;
  ImageMeta: ImageMeta;
  ObjectMeta: ObjectMeta;
  Encryption: Encryption;
  SnapshotUri: string;
}
interface VideoMeta {
  Uri: string;
  Height: number;
  Width: number;
  Duration: number;
  Md5: string;
  Bitrate: number;
  Format: string;
  Size: number;
}

interface ImageMeta {
  Uri: string;
  Height: number;
  Width: number;
  Md5: string;
}

interface ObjectMeta {
  Uri: string;
  Md5: string;
}

interface Encryption {
  Uri: string;
  SecretKey: string;
  Algorithm: string;
  Version: string;
  SourceMd5: string;
  Extra: StringMap;
}

export interface SetVideoPublishStatusResp {
  ResponseMetadata: ResponseMetadata;
}

export interface GetWeightsResp {
  ResponseMetadata: ResponseMetadata;
  Result: {
    [k: string]: {
      [p: string]: number;
    };
  };
}

export interface DomainInfo {
  MainDomain: string;
  BackupDomain: string;
}

export interface ImgUrl {
  MainUrl: string;
  BackupUrl: string;
}
