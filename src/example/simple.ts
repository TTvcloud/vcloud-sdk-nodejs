import Client from '../index';
import { PreResolve } from '../models/interceptor';

const client = new Client({
  accesskey: 'xxx',
  secretkey: 'xxx',
  version: '2018-11-19',
  service: 'ecs',
  endpoint: 'http://10.225.126.01',
});

client
  .addPreHandler({
    resolve: function(p: PreResolve) {
      console.log(p.action, p.options);
    },
  })
  .addPostHandler({
    resolve: function(r) {
      console.log('result: ', r);
      return r;
    },
    reject: function(e: Error) {
      console.error('reject: ', e);
    },
  });

client
  .request('GetKeypairs', {
    query: {
      'X-Account-Id': 1,
    },
  })
  .then(res => {
    console.log(res);
  })
  .catch(e => {
    console.error(e);
  });
