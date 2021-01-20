const EditClient = require('vcloud-sdk-nodejs/services/edit');

const client = new EditClient({
  accesskey: 'xxx',
  secretkey: 'xxx',
});

client
  .GetDirectEditResult({ ReqIds: ['xxxxxx'] })
  .then(res => {
    console.log(res);
  })
  .catch(e => {
    console.error(e);
  });
