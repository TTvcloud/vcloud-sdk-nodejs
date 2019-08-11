import Client from '../index';
import Logger from '../tools/logger';
import { PreResolve } from '../models/interceptor';

const logger = Logger.createLogger();

const client = new Client({
  accesskey: 'xxx',
  secretkey: 'xxx',
  version: '2018-11-19',
  service: 'ecs',
  endpoint: 'http://10.225.126.01',
});

client.addPreHandler({
  resolve: function (p: PreResolve) {
    logger.info(p.action, p.options);
  }
}).addPostHandler({
  resolve: function (r) {
    logger.info('result: ', r);
    return r;
  },
  reject: function (e: Error) {
    logger.error('reject: ', e);
  }
});

client.request('GetKeypairs', {
  query: {
    'X-Account-Id': 1,
  },
}).then(res => {
  console.log(res);
}).catch(e => {
  console.error(e);
})