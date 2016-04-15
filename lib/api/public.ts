// var i = require('index')(cfg);

var exporter: any = module.exports = function(cfg) {
  var Config = require('../services/ConfigService');
  var setConfig = Config.setConfig.bind(Config);

  if (cfg) setConfig(cfg);

  var Bridge = require('../services/BridgeService');

  return exporter = {
    create: Bridge.createInterface.bind(Bridge),
    register: Bridge.registerInterface.bind(Bridge),
    get: Bridge.getInterface.bind(Bridge)
  }
}