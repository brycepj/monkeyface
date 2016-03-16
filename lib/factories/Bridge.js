
var validation = $require('validation/factories');

var Bridge = (function(){
  
  $require('patchers/index');
  
  function _Bridge () { 
    this.Registry = $require('factories/Registry'); // singleton
    this.Interface = $require('factories/Interface'); // factory
    this.Declaration = $require('factories/Declaration'); // factory - may not be neccessary here
  }
  
  _Bridge.prototype.createInterface = function(){ // make name optional
    const v = validation.createInterface;
    const i = this.Interface.create(name, v(arguments)); 
    return this.Registry.create(i);
  };

  _Bridge.prototype.registerInterface = function(name, cfg){
    const v = validation.registerInterface;
    const i = this.Interface.create(name, v(cfg));
    this.Registry.register(i);
  };

  return new _Bridge();
})();

var bridge = new Bridge();

exports = bridge;