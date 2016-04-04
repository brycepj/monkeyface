
import validators = require('../validation/factories');
import {iCreateInterfaceConfig} from '../interfaces/Config';
import Config = require('./ConfigService');

class Bridge {

  public Registry: any; // create interface
  public Interface: any; // create interface
  public Declaration: any; // create interface

  constructor() {
    console.log(Config);
    require('../patchers/index');
    this.Registry = require('./RegistryService');
    this.Interface = require('../factories/InterfaceFactory'); // factory
    this.Declaration = require('../factories/DeclarationFactory');
  }

  createInterface(arg1, arg2, arg3) { // (name, props) || (props) // name , props 
    let cfg: iCreateInterfaceConfig = validators.createInterface(arg1, arg2, arg3);
    let i: any = this.Interface.create(cfg); // should return an interface (name, declarations, options)
    this.Registry.create(i);
    return i;
  };

  registerInterface(name, cfg) {
    cfg = validators.registerInterface(name, cfg);
    let i = this.Interface.create(cfg);
    this.Registry.register(i);
  };

  getInterface(name) {
    return this.Registry.get(name);
  }

  ensureImplements(iface: string, val) {
    let u = require('./utils');
    let registry = this.Registry;
    let iterable = !!val ? val : u.returnError('Need to pass an iterable to ensureImplements'); 
    let validInterface = registry.check(iface) ? registry.get(iface) : u.returnError('Please pass a valid interface, not ' + iface);
    return validInterface.validate(iterable);
  };
  

}

export = new Bridge();