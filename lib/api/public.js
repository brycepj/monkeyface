"use strict";
var Bridge = require('../services/BridgeService');
module.exports = {
    create: Bridge.createInterface.bind(Bridge),
    register: Bridge.registerInterface.bind(Bridge),
};
//# sourceMappingURL=public.js.map