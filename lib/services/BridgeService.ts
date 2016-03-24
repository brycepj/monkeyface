
import validators = require('../validation/factories');
import {iCreateInterfaceConfig} from '../interfaces/Config';

class Bridge {

  public Registry: any; // create interface
  public Interface: any; // create interface
  public Declaration: any; // create interface

  constructor() {
    require('../patchers/index');
    this.Registry = require('./RegistryService');
    this.Interface = require('../factories/InterfaceFactory'); // factory
    this.Declaration = require('../factories/DeclarationFactory');
  }

  createInterface(arg1, arg2, arg3) { // (name, props) || (props) // name , props 
    let cfg: iCreateInterfaceConfig = validators.createInterface(arg1, arg2, arg3);
    let i: any = this.Interface.create(cfg); // should return an interface (name, declarations, options)
    return this.Registry.create(i);
  };

  registerInterface(name, cfg) {
    let cfg = validators.registerInterface(name, cfg);
    let i = this.Interface.create(cfg);
    this.Registry.register(i);
  };

}

export = new Bridge();