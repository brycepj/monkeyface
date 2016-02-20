var check = require('../services/typeChecker');
var Declaration = require('./Declaration');
var u = require('../services/utils');

var Interface = (function() {
  
  function _Interface(name, cfg) {
    this.name = name;
    this.declarations = [];
    this._parseCfg(cfg);
  }

  _Interface.prototype._parseCfg = function(cfg) {
    var self = this;
    var isListCfg = check.isArray(cfg);
    var isObjectCfg = check.isObject(cfg);
    var isInferredCfg = check.isObject(cfg);

    if (isListCfg) {
      cfg.forEach(function(str) {
        self.declarations.push(new Declaration(str));
      });
    } else if (isObjectCfg) {
      u.forIn(cfg, function(value, key){
        var type = check.discernType(value);
        var str = type === 'function' ? key + '()' : [key, type].join(':');
        self.declarations.push(new Declaration(str))
      });
    }
  };
  _Interface.prototype.validate = function(argument){
     // body...  
     return true;
  };
  // static method
  _Interface.ensureImplements = function(obj, interface) {
     
  };

  return _Interface;
})();

module.exports = Interface;
