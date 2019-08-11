
视频云对外sdk的nodejs版本。

# @vcloud/openapi-core
封装了签名、请求top网关等核心业务逻辑， 用户使用类似node-fetch请求的方式请求openapi。


### 安装
```javascript
//use npm 
npm install --save vcloud-sdk-nodejs
//use yarn 
yarn add vcloud-sdk-nodejs
```

### 基本使用方式：
```
const Client = require('@vcloud/openapi-core');

const clientOptions = {
  service: '<serviceName>',
  accesskey: '<accessKeyId>',
  secretkey: '<accessKeySecret>',
  endpoint: '<endpoint>',  // top网关对外域名，目前只有vod支持对外， 默认是vod.bytedanceapi.com
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
支持在client请求接口的前后添加拦截器, 继续以上文声明的client实例为例
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

### 插件
```
拦截器的集合
const plugin = () => {
  before: [],
  post: []
}
```

# standard sdk
standard sdk指的是和具体服务相关的sdk， 在@vcloud/openapi-core的基础上进行封装， 提供给用户某一个服务相关的更快捷的使用方式。以ecs的标准api为例

```
const client = new VodClient({
    accesskey: '<accessKeyId>',
    secretkey: '<accessKeySecret>',
  });

  const res = await client.GetPlayInfo();
}
```