"use strict";
var Config = require('../services/ConfigService');
var u = require('../services/utils');
var prod = require('./prod');
var params = require('../api/params');
module.exports = (function () {
    var method = Config.env === 'production' ? prod.params : params;
    u.methodPatcher(Function, Config.paramsKey, method);
})();
//# sourceMappingURL=Function.js.map