import Client from '../core/index';

const client = new Client({
    accesskey: 'xxx',
    secretkey: 'xxx'
});

console.log(client.SignUploadSts2());
