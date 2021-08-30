import BaseClient from '../../core';
import merge from 'deepmerge';
import {
  ApplyImageUploadResp,
  CommitImageUploadResp,
  UpdateImageUploadFilesResp,
  PreviewImageUploadFileResp,
  DeleteImageUploadFilesResp,
  CommitImageUploadResult,
  UploadImagesOption,
} from './model';
import { ClientConfigs, RequestOptions } from '../../models/service';
import { REGION } from '../../constant';
import fetch, { Response } from 'node-fetch';
import fs from 'fs';

type ImagexClientConfig = Pick<ClientConfigs, 'accesskey' | 'secretkey' | 'endpoint'>;

const _defaultConfigs: Partial<ClientConfigs> = {
  service: 'imagex',
  region: REGION.CnNorth1,
  timeout: 5000,
  version: '2018-08-01',
  endpoint: 'https://imagex.bytedanceapi.com',
  headers: {
    accept: 'application/json',
  },
  needMetaData: true,
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

  UploadImages = async (option: UploadImagesOption): Promise<CommitImageUploadResult> => {
    const query = {
      ServiceId: option.serviceId,
      UploadNum: option.files.length,
    };
    if (option.fileKeys && option.fileKeys.length > 0) {
      query['StoreKeys'] = option.fileKeys;
    }

    const applyRes = await this.ApplyImageUpload({
      query,
    });
    const result = applyRes.Result;
    const reqId = result['RequestId'];
    const address = result['UploadAddress'];
    const uploadHosts = address['UploadHosts'];
    const storeInfos = address['StoreInfos'];
    if (uploadHosts.length === 0) {
      throw Error(`no upload host found, reqId: ${reqId}`);
    }
    if (address['StoreInfos'].length !== option.files.length) {
      throw Error(
        `store info len ${address['StoreInfos'].length} != upload num ${option.files.length}, reqId: ${reqId}`,
      );
    }

    const sessionKey = address['SessionKey'];
    const host = uploadHosts[0];
    await this.DoUpload(option.files, host, storeInfos);

    const commitQuery = {
      ServiceId: option.serviceId,
      SessionKey: sessionKey,
    };
    const commitRes = await this.CommitImageUpload({
      query: commitQuery,
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    return commitRes['Result'];
  };

  DoUpload = async (
    files: string[] | NodeJS.ReadableStream[] | ArrayBuffer[] | ArrayBufferView[],
    uploadHost: string,
    storeInfos: any[],
  ) => {
    const promiseArray: Promise<Response>[] = [];
    for (let i = 0; i < files.length; i++) {
      const oid = storeInfos[i]['StoreUri'];
      const auth = storeInfos[i]['Auth'];
      let file = files[i];
      if (Object.prototype.toString.call(file) === '[object String]') {
        file = fs.createReadStream(file as string);
      }
      promiseArray.push(
        fetch(`http://${uploadHost}/${oid}`, {
          method: 'post',
          headers: {
            'Content-CRC32': 'Ignore',
            Authorization: auth,
          },
          body: file,
        }),
      );
    }
    await Promise.all(promiseArray);
  };
}

export default ImagexClient;
module.exports = ImagexClient;
