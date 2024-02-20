"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaults = void 0;
var package_json_1 = require("../../package.json");
var dotenv = require('dotenv').config().parsed;
var dotenvlocal = require('dotenv').config({ path: ".env.local", override: true }).parsed;
var merged = Object.assign({}, dotenv, dotenvlocal);
var defaults = {
    version: package_json_1.version,
    env: {
        mode: 'defaults',
        port: (_a = parseInt(merged.APP_PORT)) !== null && _a !== void 0 ? _a : 3000
    },
    graphQL: {
        schemaFileName: true,
        playground: true,
        introspection: true,
        installSubscriptionHandlers: true,
    },
    jwt: {
        refreshTokenName: 'seguri-refresh-token',
        secret: 'secretKey',
        signOptions: {
            expiresIn: '8h'
        }
    },
    throttle: [{
            ttl: 60000,
            limit: 10,
        }]
};
exports.defaults = defaults;
