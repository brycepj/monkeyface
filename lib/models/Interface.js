var check = require('../services/typeChecker');
var Declaration = require('./Declaration');

var Interface = (function() {
  
  function _Interface(name, cfg) {
    this.name = name;
    this.declarations = [];
    this._parseCfg(cfg);
  }

  _Interface.prototype._parseCfg = function(cfg) {
    var self = this;
    var isListCfg = check.isArray(cfg);
    var isInferredCfg = check.isObject(cfg);

    if (isListCfg) {
      cfg.forEach(function(str) {
        self.declarations.push(new Declaration(str));
      });
    } else if (check.isObject(cfg)) {
      for (var key in cfg) {
        if (cfg.hasOwnProperty(key)) {
          var type = typeof cfg[key];
          if (type == 'function') {
            methods.push(key);
          } else {
            props.push(key);
          }
        }
      }
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
