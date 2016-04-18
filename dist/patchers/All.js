"use strict";
var Config = require('../services/ConfigService');
var ensure = require('../api/ensure');
var Types = require('../services/Types');
var u = require('../services/utils');
var prod = require('./prod');
module.exports = (function () {
    var natives = Types.allNatives();
    u.forEach(natives, function (native) {
        var method = Config.env === 'production' ? prod.ensure : ensure;
        u.methodPatcher(native, Config.ensureKey, method);
    });
})();
