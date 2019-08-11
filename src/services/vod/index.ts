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
  UploadMediaByUrlResp
  } from './model';
import { ClientConfigs, RequestOptions } from '../../models/service';
import { OptionFun } from './options';
import { REGION } from '../../constant';

type VodClientConfig = Pick<ClientConfigs, 'accesskey' | 'secretkey'> // 正确

class VodClient {

  private _base: BaseClient;
  private _defaultConfigs: Partial<ClientConfigs> = {
    service: 'vod',
    region: REGION.CnNorth1,
    timeout: 5000,
    version: '2018-01-01',
    endpoint: 'https://vod.bytedanceapi.com',
    headers: {
      'accept': 'application/json'
    },
  }

  constructor(config: VodClientConfig) {
    this._base = new BaseClient(merge(this._defaultConfigs, config));
  }

  GetPlayInfo = async (): Promise<GetPlayInfoResp> => {
    return this._base.request('GetPlayInfo', {
      version: '2019-03-15'
    } as RequestOptions)
  }

  RedirectPlay = async () => {
    return this._base.request('RedirectPlay', {
    } as RequestOptions)
  }

  GetOriginVideoPlayInfo = async (): Promise<GetOriginVideoPlayInfoResp> => {
    return this._base.request('GetOriginVideoPlayInfo', {
    } as RequestOptions)
  }

  StartTranscode = async (): Promise<StartTranscodeResp> => {
    return this._base.request('StartTranscode', {
      method: 'post',
    } as RequestOptions)
  }

  UploadMediaByUrl = async (): Promise<UploadMediaByUrlResp> => {
    return this._base.request('UploadMediaByUrl', {
    } as RequestOptions)
  }

  ApplyUpload = async (): Promise<ApplyUploadResp> => {
    return this._base.request('ApplyUpload', {
    } as RequestOptions)
  }

  CommitUpload = async (): Promise<CommitUploadResp> => {
    return this._base.request('CommitUpload', {
      method: 'post',
    } as RequestOptions)
  }


  ModifyVideoInfo = async (): Promise<ModifyVideoInfoResp> => {
    return this._base.request('ModifyVideoInfo', {
    } as RequestOptions)
  }

  Upload = async (fileBytes: Buffer, spaceName: string, fileType: FileType) => {

  }

  UploadPoster = async (vid: string, fileBytes: Buffer, spaceName: string, fileType: FileType) => {

  }

  UploadVideo = async (fileBytes: Buffer, spaceName: string, fileType: FileType, funcs: Function[]) => {

  }

  SetVideoPublishStatus = async (SpaceName, Vid, Status: string): Promise<SetVideoPublishStatusResp> => {
    return this._base.request('SetVideoPublishStatus', {
    } as RequestOptions)
  }

  GetPlayAuthToken = async () => {

  }

  GetRedirectPlayUrl = async (params: RedirectPlayParam) => {

  }

  GetUploadAuthToken = async () => {

  }


  GetCdnDomainWeights = async () => {
    return this._base.request('GetCdnDomainWeights', {
      version: '2019-07-01'
    } as RequestOptions)
  }

  GetDomainInfo = async () => {

  }

  randWeights = () => {

  }

  GetPosterUrl = (spaceName: string, uri: string, fallbackWeights: { [K: string]: number }, opts: Array<OptionFun>) => {

  }
}

export default VodClient;