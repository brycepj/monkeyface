var platform, registry;

var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
var isNode = new Function("try {return this===global;}catch(e){return false;}");

if(isNode() && global) platform = 'node';
if(isBrowser() && window) platform = 'browser';  

var top = platform == 'node' ? global : window;

var registry = top.__interfaces = {};
var global_svc = top;

module.exports = {
  err_action: 'throw',
  registry: registry,
  platform: platform,
  svc: global_svc
};