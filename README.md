视频云对外 sdk 的 nodejs 版本。

# vcloud-sdk-nodejs

封装了签名、发送请求等核心业务逻辑 ; 同时内置了 Vod 标准 API

### 安装

```javascript
//use npm
npm install vcloud-sdk-nodejs --save
//use yarn
yarn add vcloud-sdk-nodejs
```

### 基本使用方式：

```
const Client = require('vcloud-sdk-nodejs');

const clientOptions = {
  service: '<serviceName>',
  accesskey: '<accessKeyId>',
  secretkey: '<accessKeySecret>',
  endpoint: '<endpoint>',
  version: '<apiVersion>'
}

const client = new Client(clientOptions);

// requestOptions
const requestOptions = {
  method: string;  // set the http method, default is GET
  version: string; // api version; default is service apiVersion
  logId: string; // requestId
  lockTime: boolean; // aws签名时是否锁定时间戳, 默认是fase
  body: any; //请求体，当method为get、options等无body的请求方法时设置无效
  query: {  //url请求参数
    [key: string]: any;
  };
  headers: {  //自定义请求头
    [key: string]: string;
  };
};

client.request(action, requestOptions);
```

### 添加拦截器

支持在 client 请求接口的前后添加拦截器, 继续以上文声明的 client 实例为例

```
//添加前置拦截器
client.addPreHandler({
  resolve: ({action, params}) => Promise({action, params}),
  reject: err => {}
});

//添加后置拦截器
client.addPostHandler({
  resolve: (response) => Promise(response),
  reject: err => {}
})
```

# standard sdk

standard sdk 指的是和具体服务相关的 sdk，提供给用户更快捷的使用方式。以 Vod 服务的使用为例：

```
const VodClient = require('vcloud-sdk-nodejs/services/vod');

const client = new VodClient({
    accesskey: '<accessKeyId>',
    secretkey: '<accessKeySecret>',
  });

  const res = await client.GetPlayInfo();
}
```

# API

## SignSts2([inlinePolicy[,expire]])

- inlinePolicy: 策略声明, 可不传
- expire: 过期时间(ms), 可不传，默认值 60 \* 1000

```
const client = new VodClient({
    accesskey: '<accessKeyId>',
    secretkey: '<accessKeySecret>',
});

const policy: Policy = {
  Statement: [
    {
      Effect: '*',
      Action: ['*'],
      Resource: ['*'],
    },
  ],
};

const res = client.SignSts2(policy, 60 * 60);
```
