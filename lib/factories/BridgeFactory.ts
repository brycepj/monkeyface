
var validation = $require('validation/factories');

class Bridge {

  public Registry: any; // create interface
  public Interface: any; // create interface
  public Declaration: any; // create interface
  
  constructor() {
    $require('patchers/index');
    this.Registry = $require('factories/Registry'); // singleton
    this.Interface = $require('factories/Interface'); // factory
    this.Declaration = $require('factories/Declaration'); // factory - may not be neccessary here
  }

  createInterface() { // make name optional
    const v = validation.createInterface;
    const i = this.Interface.create(name, v(arguments));
    return this.Registry.create(i);
  };

  registerInterface(name, cfg) {
    const v = validation.registerInterface;
    const i = this.Interface.create(name, v(cfg));
    this.Registry.register(i);
  };

}

exports = new Bridge();