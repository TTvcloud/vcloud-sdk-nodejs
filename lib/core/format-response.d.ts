import { ClientConfigs } from '../models/service';
import { Response } from 'node-fetch';
export declare function formatResponse(config: ClientConfigs): (res: Response) => Promise<any>;
