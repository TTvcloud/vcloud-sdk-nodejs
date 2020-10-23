import BaseClient from '../../core';
import merge from 'deepmerge';
import {
  ApplyImageUploadResp,
  CommitImageUploadResp,
  UpdateImageUploadFilesResp,
  PreviewImageUploadFileResp,
  DeleteImageUploadFilesResp,
} from './model';
import { ClientConfigs, RequestOptions } from '../../models/service';
import { REGION } from '../../constant';

type ImagexClientConfig = Pick<ClientConfigs, 'accesskey' | 'secretkey'>;

const _defaultConfigs: Partial<ClientConfigs> = {
  service: 'imagex',
  region: REGION.CnNorth1,
  timeout: 5000,
  version: '2018-08-01',
  endpoint: 'http://imagex.bytedanceapi.com',
  headers: {
    accept: 'application/json',
  },
};

class ImagexClient extends BaseClient {
  constructor(config: ImagexClientConfig) {
    super(merge(_defaultConfigs, config));
  }

  ApplyImageUpload = async (option: RequestOptions): Promise<ApplyImageUploadResp> => {
    return this.request('ApplyImageUpload', option);
  };

  CommitImageUpload = async (option: RequestOptions): Promise<CommitImageUploadResp> => {
    return this.request('CommitImageUpload', option);
  };

  UpdateImageUploadFiles = async (option: RequestOptions): Promise<UpdateImageUploadFilesResp> => {
    return this.request('UpdateImageUploadFiles', option);
  };

  PreviewImageUploadFile = async (option: RequestOptions): Promise<PreviewImageUploadFileResp> => {
    return this.request('PreviewImageUploadFile', option);
  };

  DeleteImageUploadFiles = async (option: RequestOptions): Promise<DeleteImageUploadFilesResp> => {
    return this.request('DeleteImageUploadFiles', option);
  };
}

export default ImagexClient;
module.exports = ImagexClient;
