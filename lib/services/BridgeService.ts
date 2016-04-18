
var u = require('./utils');
var check = require('./typeChecker');

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

  private ensureCollection(key: string, arr: any[]): boolean {
    let typeStr = this.getCollectionKey(key);
    var checker = check.getChecker(typeStr) || this.Registry.get(typeStr);

    return arr.every((item, idx) => {
      checker = checker.validate ? checker.validate.bind(checker) : checker;
      return checker(item);
    });
  }

  private ensureImplements(iface: string, val): boolean {
    // TODO: Accept native classes & interface objects
    let iterable = !!val ? val : u.returnError('Need to pass an iterable to ensureImplements (interface)');
    let registeredInterface = this.Registry.get(iface);
    return registeredInterface.validate(iterable);
  };

  public ensureComplex(type, val): boolean {
    return !!this.getCollectionKey(type) ?
      this.ensureCollection(type, val) :
      this.ensureImplements(type, val);
  }

  private getCollectionKey(str) { // returns basic type or false
    let hasBrackets = str.indexOf('[]') > -1;
    let bracketlessType = hasBrackets ? str.slice(0, -2) : null;
    let singularType = str.slice(0, -1);
    let isPluralType = !hasBrackets && check.isValidType(singularType);
    let isPluralInterface = !isPluralType && this.Registry.check(singularType);
    return (hasBrackets || isPluralInterface || isPluralType) ?
      (hasBrackets ? bracketlessType : singularType) : false;
  }
}

export = new Bridge();

interface iInterfaceConfig {
  name: string;
  props: string[];
  options?: Object;
}

