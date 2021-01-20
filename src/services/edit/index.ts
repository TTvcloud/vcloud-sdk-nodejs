import BaseClient from '../../core';
import merge from 'deepmerge';
import {
  SubmitDirectEditTaskAsyncParams,
  SubmitDirectEditTaskAsyncResp,
  GetDirectEditResultParams,
  GetDirectEditResultResp,
  SubmitTemplateTaskAsyncParams,
  SubmitTemplateTaskAsyncResp,
} from './model';
import { ClientConfigs, RequestOptions } from '../../models/service';
import { REGION } from '../../constant';

const formatPostParams = (params, options) => {
  return merge(
    {
      body: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
    options || {},
  );
};

type EditClientConfig = Pick<ClientConfigs, 'accesskey' | 'secretkey'>;
const _defaultConfigs: Partial<ClientConfigs> = {
  service: 'edit',
  region: REGION.CnNorth1,
  timeout: 10000,
  version: '2018-01-01',
  endpoint: 'https://open.bytedanceapi.com',
  headers: {
    accept: 'application/json',
  },
};

class EditClient extends BaseClient {
  constructor(config: EditClientConfig, options?: Partial<ClientConfigs>) {
    super(merge.all([_defaultConfigs, config || {}, options || {}]) as ClientConfigs);
  }

  async SubmitDirectEditTaskAsync(
    params: SubmitDirectEditTaskAsyncParams,
    options?: Partial<RequestOptions>,
  ): Promise<SubmitDirectEditTaskAsyncResp> {
    return this.request('SubmitDirectEditTaskAsync', formatPostParams(params, options));
  }

  async GetDirectEditResult(
    params: GetDirectEditResultParams,
    options?: Partial<RequestOptions>,
  ): Promise<GetDirectEditResultResp> {
    return this.request('GetDirectEditResult', formatPostParams(params, options));
  }

  async SubmitTemplateTaskAsync(
    params: SubmitTemplateTaskAsyncParams,
    options?: Partial<RequestOptions>,
  ): Promise<SubmitTemplateTaskAsyncResp> {
    return this.request('SubmitTemplateTaskAsync', formatPostParams(params, options));
  }
}

export default EditClient;
module.exports = EditClient;
