var registry = require('./env').registry;
var global_svc = require('./env').svc;

var InterfaceFactory = (function(){
  function _InterfaceFactory () {}

  _InterfaceFactory.prototype.createInterface = function(name, cfg){
		var Interface = $require('models/Interface');
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
     return registry[key] || false;
  };

  _InterfaceFactory.prototype.setInterface = function(key, i){
     registry[key] = i;
  };

  _InterfaceFactory.prototype.ensureImplements = function(val, iface){
    // i supports string ref, or actual interface
    return iface.validate(val);
  };

  return _InterfaceFactory;
})();

var factory = new InterfaceFactory();
module.exports = factory;