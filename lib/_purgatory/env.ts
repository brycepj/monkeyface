var _ = require('lodash');
var v = require('./configValidator');

const isBrowser = new Function("try {return this===window;}catch(e){ return false;}")() && window;
const defaultCfg = { logLevel: 'error', registryKey: 'interfaces' };
const globalObject = isBrowser ? window : global; 

global['__interfaces'] = {};

module.exports = {
  logLevel: 'error',
  registry: global.__interfaces
};
// env['config'] = {};
// env.setup = function(cfg, cb) {
  
//   var validCfg = cfg ? _.assign(defaultCfg, v(cfg)) : defaultCfg;
//   globalObject['__' + validCfg.registryKey] = {}; // TODO: Potentially schema-ize this
//   env.config = {
//     logLevel: validCfg.logLevel,
//     registry: globalObject['__' + validCfg.registryKey],
//   };
//   cb();
// };


