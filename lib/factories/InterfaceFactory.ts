import check = require('../services/typeChecker');
import u = require('../services/utils');
import {Declaration} from '../models/Declaration';

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
    } else if (isInferredCfg) {
      u.forIn(cfg, function(value, key){
        var type = check.discernType(value);
        var str = type === 'function' ? key + '()' : [key, type].join(':');
        self.declarations.push(new Declaration(str))
      });
    }
  };
  _Interface.prototype.validate = function(iterable){
     var checkAll = this.declarations.every(function(declaration, idx) {
			 var key = declaration.name;
			 var val = iterable[key];
			 return declaration.validate(val, key);
		 });
     return checkAll ? iterable : false; 
  };
  // static method
  _Interface.prototype.create = function(obj, iface) {
    // various private methods to create
     return iface;
  };

  return _Interface;
})();

var interfaceFactory = new Interface();
exports = interfaceFactory;
/*
validate(iterable) {
    var checkAll = this.declarations.every(function(declaration, idx) {
      var key = declaration.name;
      var val = iterable[key];
      return declaration.validate(val, key);
    });
    return checkAll ? iterable : false;
  };
  // static method
  create(obj, iface) {
    // various private methods to create
    return iface;
  };*/