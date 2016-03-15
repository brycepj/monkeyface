var _ = require('lodash');
var platform, registry;
var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
var isNode = new Function("try {return this===global;}catch(e){return false;}");

if(isNode() && global) platform = 'node';
if(isBrowser() && window) platform = 'browser';  

var top = platform == 'node' ? global : window;

var registry = top.__interfaces = {};
var global_svc = top;

module.exports.config = function(cfg) {
  module.exports.getConfig = _.assign({
    logLevel: 'silent',
    registry: registry,
    platform: platform,
    globalObject: global_svc,
    svc: global_svc
  }, cfg);
};


