

var Bridge = (function(){
  
  $require('patchers/index');
  
  function _Bridge () { 
    this.Registry = $require('models/Registry'); // singleton
    this.Interface = $require('models/Interface'); // factory
    this.Declaration = $require('factories/Declaration'); // factory - may not be neccessary here
  }
  
  _Bridge.prototype.createInterface = function(name, cfg){
    // create, register, return interface

    var newInterface = this.Interface.create(name, cfg); // name

    this.registerInterface(newInterface);
    return newInterface;
  };

  _Bridge.prototype.registerInterface = function(name, cfg){
    var name = i.name;
    env.registry[name] = i; 
  };

  _Bridge.prototype._checkRegistryKey = function(key){
     return !!this.getInterface(key);
  };

  _Bridge.prototype.getRegistryKeys = function(){
     return env.registry.keys; 
  };

  _Bridge.prototype.getInterface = function(key){
     return env.registry[key] || false;
  };

  _Bridge.prototype.setInterface = function(key, i){
     env.registry[key] = i;
  };

  _Bridge.prototype.ensureImplements = function(val, iface){
    // i supports string ref, or actual interface
    return iface.validate(val);
  };

  return new _Bridge();
})();

module.exports = InterfaceFactory;