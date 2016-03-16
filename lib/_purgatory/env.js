var _ = require('lodash');
var v = require('./configValidator');
var isBrowser = new Function("try {return this===window;}catch(e){ return false;}")() && window;
var defaultCfg = { logLevel: 'error', registryKey: 'interfaces' };
var globalObject = isBrowser ? window : global;
global['__interfaces'] = {};
module.exports = {
    logLevel: 'error',
    registry: global.__interfaces
};
//# sourceMappingURL=env.js.map