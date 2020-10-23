import { CommonResponse } from '../../models/common';

export type ApplyImageUploadResp = CommonResponse & {
  Result: ApplyUploadResult;
};

interface ApplyUploadResult {
  RequestId: string;
  UploadAddress: UploadAddress;
}

interface UploadAddress {
  StoreInfos: StoreInfo[];
  SessionKey: string;
  UploadHosts: string[];
}

interface StoreInfo {
  StoreUri: string;
  Auth: string;
}

export type CommitImageUploadResp = CommonResponse & {
  Result: CommitImageUploadResult;
};

interface CommitImageUploadResult {
  RequestId: string;
  Results: UploadResult[];
  PluginResult: ImageInfo[];
}

interface UploadResult {
  Uri: string;
}

interface ImageInfo {
  FileName: string;
  ImageUri: string;
  ImageWidth: number;
  ImageHeight: number;
  ImageMd5: string;
}

export type UpdateImageUploadFilesResp = CommonResponse & {
  Result: UpdateImageUploadFilesResult;
};

interface UpdateImageUploadFilesResult {
  ServiceId: string;
  ImageUrls: string[];
}

export type PreviewImageUploadFileResp = CommonResponse & {
  Result: PreviewImageUploadFileResult;
};

interface PreviewImageUploadFileResult {
  ServiceId: string;
  FileName: string;
  StoreUri: string;
  ImageURL: string;
  ImageFormat: string;
  ImageSize: number;
  ImageWidth: number;
  ImageHeight: number;
  ImageFrames?: number;
  ImageDuration?: number;
}

export type DeleteImageUploadFilesResp = CommonResponse & {
  Result: DeleteImageUploadFilesResult;
};

interface DeleteImageUploadFilesResult {
  ServiceId: string;
  DeletedFiles: string[];
}
