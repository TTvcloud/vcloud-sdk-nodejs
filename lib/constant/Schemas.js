"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseSuccSchema = {
    type: 'object',
    required: ['ResponseMetadata'],
    properties: {
        ResponseMetadata: {
            type: 'object',
            required: ['Service', 'RequestId'],
            properties: {
                RequestId: {
                    type: 'string',
                    pattern: '\\d+',
                },
                Action: {
                    type: 'string',
                    minLength: 1,
                },
                Version: {
                    type: 'string',
                    minLength: 1,
                },
                Service: {
                    type: 'string',
                    minLength: 1,
                },
                Region: {
                    type: 'string',
                    minLength: 1,
                },
            },
        },
    },
};
exports.ResponseFailedSchema = {
    type: 'object',
    required: ['ResponseMetadata'],
    properties: {
        ResponseMetadata: {
            type: 'object',
            required: ['Action', 'Version', 'Service', 'Region', 'Error', 'RequestId'],
            properties: {
                RequestId: {
                    type: 'string',
                    pattern: '\\d+',
                },
                Action: {
                    type: 'string',
                    minLength: 1,
                },
                Version: {
                    type: 'string',
                    minLength: 1,
                },
                Service: {
                    type: 'string',
                    minLength: 1,
                },
                Region: {
                    type: 'string',
                    minLength: 1,
                },
                Error: {
                    type: 'object',
                    required: ['Code', 'Message'],
                    properties: {
                        Code: {
                            type: 'string',
                        },
                        Message: {
                            type: 'string',
                        },
                    },
                },
            },
        },
    },
};
//# sourceMappingURL=Schemas.js.map