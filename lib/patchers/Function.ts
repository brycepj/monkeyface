import Config = require('../services/ConfigService');
export = (function() {
	Function.prototype[Config.paramsKey] = require('../api/params');
})();

