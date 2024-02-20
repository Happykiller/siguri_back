"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var lodash_1 = require("lodash");
var defaults_1 = require("@src/config/defaults");
var config;
// eslint-disable-next-line @typescript-eslint/no-var-requires
if (process.env.NODE_ENV) {
    var custo = require("./".concat(process.env.NODE_ENV));
    exports.config = config = (0, lodash_1.merge)({}, defaults_1.defaults, custo.conf);
}
else {
    exports.config = config = defaults_1.defaults;
}
