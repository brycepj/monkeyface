var registry = require('./env').registry;
var Interface = require('../models/Interface');
var global_svc = require('./env').svc;

var InterfaceFactory = (function(){
  function _InterfaceFactory () {}

  _InterfaceFactory.prototype.create = function(name, cfg){
    var newInterface = new Interface(name, cfg); // name
    this._register(newInterface);
    return newInterface;
  };

  _InterfaceFactory.prototype._register = function(i){
    var name = i.name;
    registry[name] = i; 
  };

  _InterfaceFactory.prototype._checkRegistryKey = function(key){
     return !!this.getInterface(key);
  };

  _InterfaceFactory.prototype.getRegistryKeys = function(){
     return registry.keys; 
  };

  _InterfaceFactory.prototype.getInterface = function(key){
     return registry[key];
  };

  _InterfaceFactory.prototype.setInterface = function(key, i){
     registry[key] = i;
  };

  _InterfaceFactory.prototype.ensureImplements = function(val, i){
    // i supports string ref, or actual interface
    var isKey = typeof i === 'string' && this._checkRegistryKey(i);
    var result = isKey ? this.getInterface(i).validate(val) : i.validate(val);
    return result;
  };

  return _InterfaceFactory;
})();

var factory = global_svc['Interface'] = new InterfaceFactory();
module.exports = factory;