/// <reference types="node" />
import { ApplyUploadResp, CommitUploadResp, FileType, GetOriginVideoPlayInfoResp, GetPlayInfoResp, ModifyVideoInfoResp, RedirectPlayParam, SetVideoPublishStatusResp, StartTranscodeResp, UploadMediaByUrlResp } from './model';
import { ClientConfigs } from '../../models/service';
import { OptionFun } from './options';
declare type VodClientConfig = Pick<ClientConfigs, 'accesskey' | 'secretkey'>;
declare class VodClient {
    private _base;
    private _defaultConfigs;
    constructor(config: VodClientConfig);
    GetPlayInfo: () => Promise<GetPlayInfoResp>;
    RedirectPlay: () => Promise<any>;
    GetOriginVideoPlayInfo: () => Promise<GetOriginVideoPlayInfoResp>;
    StartTranscode: () => Promise<StartTranscodeResp>;
    UploadMediaByUrl: () => Promise<UploadMediaByUrlResp>;
    ApplyUpload: () => Promise<ApplyUploadResp>;
    CommitUpload: () => Promise<CommitUploadResp>;
    ModifyVideoInfo: () => Promise<ModifyVideoInfoResp>;
    Upload: (fileBytes: Buffer, spaceName: string, fileType: FileType) => Promise<void>;
    UploadPoster: (vid: string, fileBytes: Buffer, spaceName: string, fileType: FileType) => Promise<void>;
    UploadVideo: (fileBytes: Buffer, spaceName: string, fileType: FileType, funcs: Function[]) => Promise<void>;
    SetVideoPublishStatus: (SpaceName: any, Vid: any, Status: string) => Promise<SetVideoPublishStatusResp>;
    GetPlayAuthToken: () => Promise<void>;
    GetRedirectPlayUrl: (params: RedirectPlayParam) => Promise<void>;
    GetUploadAuthToken: () => Promise<void>;
    GetCdnDomainWeights: () => Promise<any>;
    GetDomainInfo: () => Promise<void>;
    randWeights: () => void;
    GetPosterUrl: (spaceName: string, uri: string, fallbackWeights: {
        [K: string]: number;
    }, opts: OptionFun[]) => void;
}
export default VodClient;
