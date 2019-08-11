export declare const ResponseSuccSchema: {
    type: string;
    required: string[];
    properties: {
        ResponseMetadata: {
            type: string;
            required: string[];
            properties: {
                RequestId: {
                    type: string;
                    pattern: string;
                };
                Action: {
                    type: string;
                    minLength: number;
                };
                Version: {
                    type: string;
                    minLength: number;
                };
                Service: {
                    type: string;
                    minLength: number;
                };
                Region: {
                    type: string;
                    minLength: number;
                };
            };
        };
    };
};
export declare const ResponseFailedSchema: {
    type: string;
    required: string[];
    properties: {
        ResponseMetadata: {
            type: string;
            required: string[];
            properties: {
                RequestId: {
                    type: string;
                    pattern: string;
                };
                Action: {
                    type: string;
                    minLength: number;
                };
                Version: {
                    type: string;
                    minLength: number;
                };
                Service: {
                    type: string;
                    minLength: number;
                };
                Region: {
                    type: string;
                    minLength: number;
                };
                Error: {
                    type: string;
                    required: string[];
                    properties: {
                        Code: {
                            type: string;
                        };
                        Message: {
                            type: string;
                        };
                    };
                };
            };
        };
    };
};
