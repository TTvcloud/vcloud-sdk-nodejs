import _debug from 'debug';
import getAjvInst from '../tools/ajv';
import { ClientConfigs } from '../models/service';
import { getHeader } from '../tools/util';
import { Response } from 'request';
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
          code: res.statusCode,
          body: await res.statusMessage,
        }),
      );
    }

    let ret = await res.toJSON();
    const ajvInst = getAjvInst();

    if (res.statusCode >= 200 && res.statusCode < 300) {
      // throw new Error(JSON.stringify({ message: `${res.status} ${res.statusText}`, code: res.status, body: ret }));
      throw new Error(JSON.stringify({ code: res.statusCode, body: ret.body }));
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
      return { body: ret, headers: res.rawHeaders };
    }

    return ret;
  }
}
