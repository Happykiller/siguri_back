"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conf = void 0;
var conf = {
    env: {
        mode: 'prod'
    },
    graphQL: {
        schemaFileName: false,
        playground: false,
        introspection: false,
        installSubscriptionHandlers: false,
    },
    jwt: {
        secret: 'igil'
    },
};
exports.conf = conf;
