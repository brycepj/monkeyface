
import u = require('./utils');
import validators = require('../validation/factories');
import {iCreateInterfaceConfig} from '../interfaces/Config';

class Bridge {

  public Registry: any; // create interface
  public Interface: any; // create interface
  public Declaration: any; // create interface
  public Config: any;

  constructor() {
    require('../patchers/index');
    this.Registry = require('./RegistryService');
    this.Interface = require('../factories/InterfaceFactory'); // factory
    this.Declaration = require('../factories/DeclarationFactory');
  }

  createInterface(name, props, options?) { // (name, props) || (props) // name , props 
    let iface: any = this.Interface.create(name, props, options);
    this.Registry.register(iface);
    return iface;
  };

  getInterface(name) {
    return this.Registry.get(name);
  }

  ensureCollection(collectionDeclaration: string, arr: any[]): boolean {
    let check = require('./typeChecker');
    var checker = check.getChecker(collectionDeclaration)
      || check.getChecker(collectionDeclaration.slice(0, -1))
      || this.Registry.get(collectionDeclaration.slice(0, -1));

    return arr.every((item, idx) => {
      checker = checker.validate ? checker.validate.bind(checker) : checker;
      return checker(item);
    });
  }

  ensureImplements(iface: string, val): boolean {
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

interface iInterfaceConfig {
  name: string;
  props: string[];
  options?: Object;
}