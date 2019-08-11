"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = tslib_1.__importDefault(require("../../core"));
const deepmerge_1 = tslib_1.__importDefault(require("deepmerge"));
const constant_1 = require("../../constant");
class VodClient {
    constructor(config) {
        this._defaultConfigs = {
            service: 'vod',
            region: constant_1.REGION.CnNorth1,
            timeout: 5000,
            version: '2018-01-01',
            endpoint: 'https://vod.bytedanceapi.com',
            headers: {
                'accept': 'application/json'
            },
        };
        this.GetPlayInfo = async () => {
            return this._base.request('GetPlayInfo', {
                version: '2019-03-15'
            });
        };
        this.RedirectPlay = async () => {
            return this._base.request('RedirectPlay', {});
        };
        this.GetOriginVideoPlayInfo = async () => {
            return this._base.request('GetOriginVideoPlayInfo', {});
        };
        this.StartTranscode = async () => {
            return this._base.request('StartTranscode', {
                method: 'post',
            });
        };
        this.UploadMediaByUrl = async () => {
            return this._base.request('UploadMediaByUrl', {});
        };
        this.ApplyUpload = async () => {
            return this._base.request('ApplyUpload', {});
        };
        this.CommitUpload = async () => {
            return this._base.request('CommitUpload', {
                method: 'post',
            });
        };
        this.ModifyVideoInfo = async () => {
            return this._base.request('ModifyVideoInfo', {});
        };
        this.Upload = async (fileBytes, spaceName, fileType) => {
        };
        this.UploadPoster = async (vid, fileBytes, spaceName, fileType) => {
        };
        this.UploadVideo = async (fileBytes, spaceName, fileType, funcs) => {
        };
        this.SetVideoPublishStatus = async (SpaceName, Vid, Status) => {
            return this._base.request('SetVideoPublishStatus', {});
        };
        this.GetPlayAuthToken = async () => {
        };
        this.GetRedirectPlayUrl = async (params) => {
        };
        this.GetUploadAuthToken = async () => {
        };
        this.GetCdnDomainWeights = async () => {
            return this._base.request('GetCdnDomainWeights', {
                version: '2019-07-01'
            });
        };
        this.GetDomainInfo = async () => {
        };
        this.randWeights = () => {
        };
        this.GetPosterUrl = (spaceName, uri, fallbackWeights, opts) => {
        };
        this._base = new core_1.default(deepmerge_1.default(this._defaultConfigs, config));
    }
}
exports.default = VodClient;
module.exports = VodClient;
//# sourceMappingURL=index.js.map