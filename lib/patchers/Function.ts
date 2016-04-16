import Config = require('../services/ConfigService');
import u = require('../services/utils');
import prod = require('./prod');
var params = require('../api/params');

export = (function() {
	u.methodPatcher(Function, Config.paramsKey, params);
})();

