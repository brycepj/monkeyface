import Bridge = require('../services/BridgeService');

export = {
  create: Bridge.createInterface,
  register: Bridge.registerInterface,
  // config: Bridge.configureFactory
};
