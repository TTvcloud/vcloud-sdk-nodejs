import { FetchOptions } from '../models/service';
declare function dispatchRequest(options: FetchOptions): () => Promise<import("node-fetch").Response>;
export { dispatchRequest };
