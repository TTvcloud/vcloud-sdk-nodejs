import BaseClient from '../../core';
import merge from 'deepmerge';
import {
  ApplyUploadResp,
  CommitUploadResp,
  FileType,
  GetOriginVideoPlayInfoResp,
  GetPlayInfoResp,
  ModifyVideoInfoResp,
  RedirectPlayParam,
  SetVideoPublishStatusResp,
  StartTranscodeResp,
  UploadMediaByUrlResp,
} from './model';
import { ClientConfigs, RequestOptions } from '../../models/service';
import { OptionFun } from './options';
import { REGION } from '../../constant';

type VodClientConfig = Pick<ClientConfigs, 'accesskey' | 'secretkey'>; // 正确
const _defaultConfigs: Partial<ClientConfigs> = {
  service: 'vod',
  region: REGION.CnNorth1,
  timeout: 5000,
  version: '2018-01-01',
  endpoint: 'https://vod.bytedanceapi.com',
  headers: {
    accept: 'application/json',
  },
};

class VodClient extends BaseClient {
  constructor(config: VodClientConfig) {
    super(merge(_defaultConfigs, config));
  }

  async GetPlayInfo(): Promise<GetPlayInfoResp> {
    return this.request('GetPlayInfo', {
      version: '2019-03-15',
    } as RequestOptions);
  }

  async RedirectPlay() {
    return this.request('RedirectPlay', {} as RequestOptions);
  }

  GetOriginVideoPlayInfo = async (): Promise<GetOriginVideoPlayInfoResp> => {
    return this.request('GetOriginVideoPlayInfo', {} as RequestOptions);
  };

  StartTranscode = async (): Promise<StartTranscodeResp> => {
    return this.request('StartTranscode', {
      method: 'post',
    } as RequestOptions);
  };

  UploadMediaByUrl = async (): Promise<UploadMediaByUrlResp> => {
    return this.request('UploadMediaByUrl', {} as RequestOptions);
  };

  ApplyUpload = async (): Promise<ApplyUploadResp> => {
    return this.request('ApplyUpload', {} as RequestOptions);
  };

  CommitUpload = async (): Promise<CommitUploadResp> => {
    return this.request('CommitUpload', {
      method: 'post',
    } as RequestOptions);
  };

  ModifyVideoInfo = async (): Promise<ModifyVideoInfoResp> => {
    return this.request('ModifyVideoInfo', {} as RequestOptions);
  };

  Upload = async (fileBytes: Buffer, spaceName: string, fileType: FileType) => {};

  UploadPoster = async (vid: string, fileBytes: Buffer, spaceName: string, fileType: FileType) => {};

  UploadVideo = async (fileBytes: Buffer, spaceName: string, fileType: FileType, funcs: Function[]) => {};

  SetVideoPublishStatus = async (SpaceName, Vid, Status: string): Promise<SetVideoPublishStatusResp> => {
    return this.request('SetVideoPublishStatus', {} as RequestOptions);
  };

  GetPlayAuthToken = async () => {};

  GetRedirectPlayUrl = async (params: RedirectPlayParam) => {};

  GetUploadAuthToken = async () => {};

  GetCdnDomainWeights = async () => {
    return this.request('GetCdnDomainWeights', {
      version: '2019-07-01',
    } as RequestOptions);
  };

  GetDomainInfo = async () => {};

  randWeights = () => {};

  GetPosterUrl = (spaceName: string, uri: string, fallbackWeights: { [K: string]: number }, opts: OptionFun[]) => {};
}

export default VodClient;
module.exports = VodClient;
