// import Client from 'vcloud-sdk-nodejs';
import Client from '../core/index';
import { Policy } from 'src/models';

const client = new Client({
  accesskey: 'xxx',
  secretkey: 'xxx',
  version: 'xxx',
  service: 'xxx',
  endpoint: 'http://xxx',
});
const policy: Policy = {
  Statement: [
    {
      Effect: '*',
      Action: ['GetInfo'],
      Resource: ['*'],
    },
  ],
};

console.log(client.SignSts2(policy, 10));
