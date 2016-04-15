import Config = require('../services/ConfigService');
import u = require('../services/utils');
var params = require('../api/params');

export = (function() {
	u.methodPatcher(Function, Config.paramsKey, params);
})();

