import VodClient from '../services/vod';
import { Policy } from 'src/models';

const client = new VodClient({
  accesskey: 'xxx',
  secretkey: 'xxx',
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
console.log(policy);

const res = client.SignSts2(10);
console.log(res);
