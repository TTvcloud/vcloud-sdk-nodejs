import VodClient from '../services/vod';

const client = new VodClient({
  accesskey: 'xxx',
  secretkey: 'xxx',
});

client
  .GetPlayInfo()
  .then(res => {
    console.log(res);
  })
  .catch(e => {
    console.error(e);
  });
