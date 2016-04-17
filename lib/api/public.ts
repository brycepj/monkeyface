import prod = require('../patchers/prod');

var exporter: any = module.exports = function(cfg) {
  let Config = require('../services/ConfigService');
  let setConfig = Config.setConfig.bind(Config);
  let isProduction = Config.env === 'production';
  if (cfg) setConfig(cfg);
  let Bridge = require('../services/BridgeService');


  return exporter = {
    create: isProduction ? prod.create : Bridge.createInterface.bind(Bridge),
    get: isProduction ? prod.get : Bridge.getInterface.bind(Bridge)
  };
}