# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.3.16](https://github.com/TTvcloud/vcloud-sdk-nodejs/compare/v1.3.15...v1.3.16) (2021-09-18)


### Features

* support logid and default timeout to 10s ([f252ba1](https://github.com/TTvcloud/vcloud-sdk-nodejs/commit/f252ba1bc2aac58c9211bd0b5179b7d5099d35de))

### [1.3.15](https://github.com/TTvcloud/vcloud-sdk-nodejs/compare/v1.3.14...v1.3.15) (2021-09-17)


### Bug Fixes

* 补充类型定义 ([202484c](https://github.com/TTvcloud/vcloud-sdk-nodejs/commit/202484c9a33bfda0b3f683bd94ddce55fca023d3))

### [1.3.14](https://github.com/TTvcloud/vcloud-sdk-nodejs/compare/v1.3.13...v1.3.14) (2021-08-30)


### Bug Fixes

* 修复imagex初始参数类型 ([06bb71f](https://github.com/TTvcloud/vcloud-sdk-nodejs/commit/06bb71f260311ecbbe93ffcb25a8749c91fd6950))

### [1.3.13](https://github.com/TTvcloud/vcloud-sdk-nodejs/compare/v1.3.12...v1.3.13) (2021-01-20)


### Features

* add image upload ([277deee](https://github.com/TTvcloud/vcloud-sdk-nodejs/commit/277deeebc1ee91acee84cf6c7a717412a406f6de))
* update edit apis ([2dfa98b](https://github.com/TTvcloud/vcloud-sdk-nodejs/commit/2dfa98b189ea589efae9c84d42e920fd2903d317))


### Bug Fixes

* fix imagex type error ([5c15b91](https://github.com/TTvcloud/vcloud-sdk-nodejs/commit/5c15b912f3db2db96e3a78b535455cdfc8266b31))

### [1.3.12](https://github.com/TTvcloud/vcloud-sdk-nodejs/compare/v1.3.11...v1.3.12) (2020-10-23)


### Features

* add imagex apis ([15284bc](https://github.com/TTvcloud/vcloud-sdk-nodejs/commit/15284bc4305ded6fde19a797485f56252f2c97e1))
* 修改PKCS5Padding方法名称 ([659a3b6](https://github.com/TTvcloud/vcloud-sdk-nodejs/commit/659a3b69d3c300ad90badd21c149f5d89a707792))

### [1.3.11](https://github.com/TTvcloud/vcloud-sdk-nodejs/compare/v1.3.10...v1.3.11) (2020-06-08)


### Features

* 修改输出时间格式 ([824377a](https://github.com/TTvcloud/vcloud-sdk-nodejs/commit/824377af2033099444929bdd879f5e09d3b59638))


### Bug Fixes

* add the CurrentTime field to the SecurityToken2 structure and change the expiration time to 1 hour. ([41f7876](https://github.com/TTvcloud/vcloud-sdk-nodejs/commit/41f7876966ddc4fd0299efdd082d5702994821e9))

### [1.3.10](https://github.com/TTvcloud/vcloud-sdk-nodejs/compare/v1.3.9...v1.3.10) (2020-06-02)


### Features

* 修改依赖位置 ([febe82e](https://github.com/TTvcloud/vcloud-sdk-nodejs/commit/febe82e32eaf9e0f5cd88865007e9512c9176de5))

### [1.3.9](https://github.com/TTvcloud/vcloud-sdk-nodejs/compare/v1.3.8...v1.3.9) (2020-02-26)


### Bug Fixes

* expiredTime格式错误的bugfix ([10b44c2](https://github.com/TTvcloud/vcloud-sdk-nodejs/commit/10b44c2a09365ea3021b61f7c30f7adbe97e3d82))

### [1.3.8](https://github.com/TTvcloud/vcloud-sdk-nodejs/compare/v1.3.7...v1.3.8) (2020-02-20)


### Bug Fixes

* 修复sts2签名过期时间不准确的问题 ([e9ffab9](https://github.com/TTvcloud/vcloud-sdk-nodejs/commit/e9ffab9a8d9c32d8bc51b9717ca68c7d6602f18e))

### [1.3.7](https://github.com/TTvcloud/vcloud-sdk-nodejs/compare/v1.3.6...v1.3.7) (2019-11-27)


### Features

* 修改sts2签名的默认过期时间为10分钟 ([348cba8](https://github.com/TTvcloud/vcloud-sdk-nodejs/commit/348cba872d1d38da1239218d71e02140cc75f1e5))

### [1.3.6](https://github.com/TTvcloud/vcloud-sdk-nodejs/compare/v1.3.5...v1.3.6) (2019-11-26)

### [1.3.5](https://github.com/TTvcloud/vcloud-sdk-nodejs/compare/v1.3.4...v1.3.5) (2019-11-25)


### Features

* policy默认的Effect设为Allow ([0bf2e27](https://github.com/TTvcloud/vcloud-sdk-nodejs/commit/0bf2e27e6720782e9f4c888cfd66932c36a834e6))

### [1.3.3](https://github.com/TTvcloud/vcloud-sdk-nodejs/compare/v1.3.2...v1.3.3) (2019-11-25)

### Features

- 设置默认 policy 的 Action,Resource 为\* ([e7c9245](https://github.com/TTvcloud/vcloud-sdk-nodejs/commit/e7c9245a68c0490f4f7fab182496b7dcaa5bff23))

### [1.3.2](https://github.com/TTvcloud/vcloud-sdk-nodejs/compare/v1.3.1...v1.3.2) (2019-11-22)

### Bug Fixes

- 修改 ClientConfigs 类型的属性定义 ([0673d76](https://github.com/TTvcloud/vcloud-sdk-nodejs/commit/0673d76dd831cc7cc77786e5ffd637181d454938))

### [1.3.1](https://github.com/TTvcloud/vcloud-sdk-nodejs/compare/v1.3.0...v1.3.1) (2019-11-21)

### Features

- 删除默认 logger ([2bdf55e](https://github.com/TTvcloud/vcloud-sdk-nodejs/commit/2bdf55e8198c2c773c2e3bc2f15d3bba8e4c0f30))

# [1.3.0](https://github.com/TTvcloud/vcloud-sdk-nodejs/compare/v1.2.3...v1.3.0) (2019-11-21)

### Features

- 创建 Client 实例时 version,version,endpoint 非必传 ([698db04](https://github.com/TTvcloud/vcloud-sdk-nodejs/commit/698db045041774d89e3f41cf3f6a0e5dde723cd6))

# [1.2.0](https://github.com/TTvcloud/vcloud-sdk-nodejs/compare/v1.1.0...v1.2.0) (2019-11-08)

### Features

- 新增 sts2 接口 ([1826a89](https://github.com/TTvcloud/vcloud-sdk-nodejs/commit/1826a8996145cf2b77d66f0e41be0d4ab306060c))

## [1.0.5](https://github.com/TTvcloud/vcloud-sdk-nodejs/compare/7058b859a201c0f3a05a1680a671d584f1578878...v1.0.5) (2019-10-20)

### Bug Fixes

- post 请求 body 解析的 bugfix ([c797b80](https://github.com/TTvcloud/vcloud-sdk-nodejs/commit/c797b807f8fe8cfd6e10c96c3c74bb2833664564))

### Features

- 初始化 nodejs sdk ([7058b85](https://github.com/TTvcloud/vcloud-sdk-nodejs/commit/7058b859a201c0f3a05a1680a671d584f1578878))
