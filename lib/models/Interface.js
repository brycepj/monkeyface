module.exports = Interface;
var check = require('../services/typeChecker');

var Interface = (function() {
  function _Interface(cfg) {
    this.props = null;
    this.methods = null;
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
    }
    // should return
    this.props = [];
    this.methods = [];
  };

  return _Interface;
})();

/*

  Should take an array of properties, methods
  or 
  An object


  ['private prop', 'public method()']

*/
