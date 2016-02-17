var check = require('../services/typeChecker');

var Interface = (function() {
  
  function _Interface(name, cfg) {
    this.props = null;
    this.methods = null;
    this.name = name;
    this._parseCfg(cfg);
  }

  _Interface.prototype._parseCfg = function(cfg) {

    var isArray = check.isArray(cfg);
    var props = [];
    var methods = [];

    if (isArray) {
      cfg.forEach(function(str) {
        var method = str.includes('()') ? str.slice(0, -2) : null;
        if (method) {
          methods.push(method);
        } else {
          props.push(str);
        }
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
    // should return
    this.props = props;
    this.methods = methods;
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
