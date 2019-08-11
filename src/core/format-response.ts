import _debug from 'debug';
import getAjvInst from '../tools/ajv';
import { ClientConfigs } from '../models/service';
import { getHeader } from '../tools/util';
import { Response } from 'node-fetch';
import { ResponseFailedSchema, ResponseSuccSchema } from '../constant/Schemas';

const debug = _debug('openapi-format-response');


export function formatResponse(config: ClientConfigs) {

  return async (res: Response) => {
    debug('validateRes...');

    const { needMetaData, needHeaders } = config;
    const contentType = getHeader(res.headers, 'content-type');

    //限定json类型
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(
        JSON.stringify({
          message: `error: 错误的返回数据类型 ${contentType}`,
          code: res.status,
          body: await res.text(),
        }),
      );
    }

    let ret = await res.json();
    const ajvInst = getAjvInst();

    if (!res.ok) {
      // throw new Error(JSON.stringify({ message: `${res.status} ${res.statusText}`, code: res.status, body: ret }));
      throw new Error(JSON.stringify({ code: res.status, body: ret.ResponseMetadata.Error.Message }));
    }
    if (!(ajvInst.validate(ResponseSuccSchema, ret) || ajvInst.validate(ResponseFailedSchema, ret))) {
      throw new Error(`返回数据${JSON.stringify(ret, null, 2)}不符合openAPI通用数据规范`);
    }
    if (ret['ResponseMetadata']['Error']) {
      throw new Error(JSON.stringify(ret));
    }

    if (!needMetaData) {
      ret = ret['Result'];
    }

    if (needHeaders) {
      ret = { body: ret, headers: res.headers.raw() };
    }

    return ret;
  }
}
