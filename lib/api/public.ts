import Config = require('../services/ConfigService');
import Bridge = require('../services/BridgeService');

export = {
  create: Bridge.createInterface.bind(Bridge),
  register: Bridge.registerInterface.bind(Bridge),
  get: Bridge.getInterface.bind(Bridge),
  config: Config.setConfig.bind(Config)
};
