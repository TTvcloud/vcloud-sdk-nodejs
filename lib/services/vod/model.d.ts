import { CommonResponse, ResponseMetadata } from '../../models/common';
export declare const VideoFormat: {
    MP4: string;
    M3U8: string;
};
export declare const FileTypes: {
    VIDEO: string;
    IMAGE: string;
    OBJECT: string;
};
export declare const VideoDefinition: {
    D1080P: string;
    D720P: string;
    D540P: string;
    D480P: string;
    D360P: string;
    D240P: string;
};
declare type StringMap = {
    [k: string]: string;
};
declare type VideoDefinition = string;
declare type VideoFormat = string;
export declare type FileType = 'video' | 'image' | 'object';
export declare type GetPlayInfoResp = {
    ResponseMetadata: ResponseMetadata;
    Result: GetPlayInfoData;
};
declare type GetPlayInfoData = {
    Data: GetPlayInfoInner;
};
declare type GetPlayInfoInner = {
    Status: number;
    VideoID: string;
    CoverUrl: string;
    Duration: Number;
    MediaType: string;
    TotalCount: number;
    PlayInfoList: Array<PlayInfo>;
};
declare type PlayInfo = {
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
};
export declare type GetOriginVideoPlayInfoResp = {
    ResponseMetadata: ResponseMetadata;
    Result: GetOriginVideoPlayInfoData;
};
declare type GetOriginVideoPlayInfoData = {
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
};
export declare type StartTranscodeRequest = {
    Vid: string;
    TemplateId: string;
    Priority: number;
};
declare type StartTranscodeResult = {
    RunId: string;
};
export declare type StartTranscodeResp = {
    ResponseMetadata: ResponseMetadata;
    Result: StartTranscodeResult;
};
declare type UploadMediaByUrlResult = {
    Code: number;
    Message: string;
};
export declare type UploadMediaByUrlResp = CommonResponse & {
    Result: UploadMediaByUrlResult;
};
export declare type UploadMediaByUrlParams = {
    SpaceName: string;
    Format: VideoFormat;
    SourceUrls: Array<string>;
    CallbackArgs: string;
};
export declare type ApplyUploadParam = {
    SpaceName: string;
    SessionKey: string;
    FileType: FileType;
    FileSize: number;
    UploadNum: number;
};
export declare type ApplyUploadResp = CommonResponse & {
    Result: ApplyUploadResult;
};
declare type ApplyUploadResult = {
    RequestID: string;
    UploadAddress: UploadAddress;
};
declare type UploadAddress = {
    StoreInfos: Array<StoreInfo>;
    UploadHosts: Array<string>;
    UploadHeader: StringMap;
    SessionKey: string;
    AdvanceOption: AdvanceOption;
};
export declare type RedirectPlayParam = {
    Vid: string;
    Definition: VideoDefinition;
    Watermark: string;
    Expires: string;
};
declare type StoreInfo = {
    StoreUri: string;
    Auth: string;
};
declare type AdvanceOption = {
    Parallel: number;
    Stream: number;
    SliceSize: number;
};
export declare type ModifyVideoInfoBody = {
    SpaceName: string;
    Vid: string;
    Info: UserMetaInfo;
    Tags: TagControl;
};
declare type UserMetaInfo = {
    Title: string;
    Description: string;
    Category: string;
    PosterUri: string;
};
declare type TagControl = {
    Deletes: string;
    Adds: string;
};
export declare type ModifyVideoInfoResp = {
    ResponseMetadata: ResponseMetadata;
    Result: ModifyVideoInfoBaseResp;
};
declare type ModifyVideoInfoBaseResp = {
    BaseResp: BaseResp;
};
declare type BaseResp = {
    StatusMessage: string;
    StatusCode: number;
};
export declare type CommitUploadParam = {
    SpaceName: string;
    Body: CommitUploadBody;
};
declare type CommitUploadBody = {
    CallbackArgs: string;
    SessionKey: string;
    Functions: Array<Function>;
};
declare type Function = {
    Name: string;
};
export declare type SnapshotInput = {
    SnapshotTime: number;
};
export declare type EntryptionInput = {
    Config: StringMap;
    PolicyParams: StringMap;
};
export declare type OptionInfo = {
    Title: string;
    Tags: string;
    Description: string;
    Category: string;
};
export declare type WorkflowInput = {
    TemplateId: string;
};
export declare type CommitUploadResp = CommonResponse & {
    Result: CommitUploadResult;
};
declare type CommitUploadResult = {
    RequestId: string;
    Results: Array<UploadResult>;
};
declare type UploadResult = {
    Vid: string;
    VideoMeta: VideoMeta;
    ImageMeta: ImageMeta;
    ObjectMeta: ObjectMeta;
    Encryption: Encryption;
    SnapshotUri: string;
};
declare type VideoMeta = {
    Uri: string;
    Height: number;
    Width: number;
    Duration: number;
    Md5: string;
    Bitrate: number;
    Format: string;
    Size: number;
};
declare type ImageMeta = {
    Uri: string;
    Height: number;
    Width: number;
    Md5: string;
};
declare type ObjectMeta = {
    Uri: string;
    Md5: string;
};
declare type Encryption = {
    Uri: string;
    SecretKey: string;
    Algorithm: string;
    Version: string;
    SourceMd5: string;
    Extra: StringMap;
};
export declare type SetVideoPublishStatusResp = {
    ResponseMetadata: ResponseMetadata;
};
export declare type GetWeightsResp = {
    ResponseMetadata: ResponseMetadata;
    Result: {
        [k: string]: {
            [p: string]: number;
        };
    };
};
export declare type DomainInfo = {
    MainDomain: string;
    BackupDomain: string;
};
export declare type ImgUrl = {
    MainUrl: string;
    BackupUrl: string;
};
export {};
