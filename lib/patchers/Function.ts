import Config = require('../services/ConfigService');
import u = require('../services/utils');
import prod = require('./prod');
var params = require('../api/params');

export = (function() {
  let method = Config.env === 'production' ? prod.params : params;
	u.methodPatcher(Function, Config.paramsKey, method);
})();

