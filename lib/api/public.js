var prod = require('../patchers/prod');
var exporter = module.exports = function (cfg) {
    var Config = require('../services/ConfigService');
    var setConfig = Config.setConfig.bind(Config);
    var isProduction = Config.env === 'production';
    if (cfg)
        setConfig(cfg);
    var Bridge = require('../services/BridgeService');
    return exporter = {
        create: isProduction ? prod.create : Bridge.createInterface.bind(Bridge),
        get: isProduction ? prod.get : Bridge.getInterface.bind(Bridge)
    };
};
//# sourceMappingURL=public.js.map