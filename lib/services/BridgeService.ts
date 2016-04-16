
import validators = require('../validation/factories');
import {iCreateInterfaceConfig} from '../interfaces/Config';

class Bridge {

  public Registry: any; // create interface
  public Interface: any; // create interface
  public Declaration: any; // create interface
  public Config: any;
  public State: any;

  constructor() {
    require('../patchers/index');
    this.Registry = require('./RegistryService');
    this.Interface = require('../factories/InterfaceFactory'); // factory
    this.Declaration = require('../factories/DeclarationFactory');

    this.State = {}; // track passes and fails
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

  ensureCollection(collectionDeclaration: string, arr: any[]) {
    let check = require('./typeChecker');
    var checker = check.getChecker(collectionDeclaration)
      || check.getChecker(collectionDeclaration.slice(0, -1))
      || this.Registry.get(collectionDeclaration.slice(0, -1));

    return arr.every((item, idx) => {
      checker = checker.validate ? checker.validate.bind(checker) : checker;
      return checker(item);
    });
  }

  ensureImplements(iface: string, val) {
    // TODO: Accept native classes
    let u = require('./utils');
    let registry = this.Registry;
    // TODO: Accept interface objects
    iface = iface['name'] ? iface['name'] : iface;
    let iterable = !!val ? val : u.returnError('Need to pass an iterable to ensureImplements');
    let validInterface = registry.check(iface) ? registry.get(iface) : u.returnError('Please pass a valid interface, not ' + iface);
    return validInterface.validate(iterable);
  };


}

export = new Bridge();