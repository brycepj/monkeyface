import Bridge = require('../services/BridgeService');

export = {
  create: Bridge.createInterface.bind(Bridge),
  register: Bridge.registerInterface.bind(Bridge)
};
