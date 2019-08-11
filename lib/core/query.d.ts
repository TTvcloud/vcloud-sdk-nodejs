declare class Query extends Error {
    private chain;
    constructor(chain: any);
    exec(): any;
}
export default Query;
