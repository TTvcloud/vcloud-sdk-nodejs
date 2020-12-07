import path from 'path';
import ImageXClient from '../services/imagex';

const client = new ImageXClient({
  accesskey: 'your ak',
  secretkey: 'your sk',
});

client
  .UploadImages({
      serviceId: 'your service id',
      files: [path.resolve(__dirname, 'xxx.png'), path.resolve(__dirname, 'xxx2.png')],
      fileKeys: ['key1', 'key2']
  })
  .then(res => {
    console.log(res);
  })
  .catch(e => {
    console.error(e);
  });
