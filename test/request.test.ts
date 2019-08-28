import Client from '../src/core/index2';

describe('test call request', () => {
    const config = {
        timeout: 3000,
        accesskey: 'test acesskey',
        secretkey: 'test secretkey',
        endpoint: 'http://endpoint',
        version: '1.0.1',
        service: 'test service',
    };
    it('should config', () => {
        const client = new Client({
            needMetaData: false,
            needHeaders: false,
            callCluster: 'default',
            timeout: 3000,
            accesskey: 'test acesskey',
            secretkey: 'test secretkey',
            endpoint: 'http://endpoint',
            version: '1.0.1',
            service: 'test service',
        });
        expect(client._configs).toBe({

        });
    })
});
