import {iInterface, iDeclaration} from '../interfaces/Models';
import {iCreateInterfaceConfig} from '../interfaces/Config';
import DeclarationFactory = require('../factories/DeclarationFactory');
var check = require('../services/typeChecker');
import u = require('../services/utils');
import _ = require('lodash');

// TODO: Abstract out validation code into a validating service
export class Interface {

  public declarations: iDeclaration[];
  public name: string;
  public key: any;
  public options: any;
  public collection: any;
  public required: any;
  public method: any;
  public type: any;
  public i: any;

  constructor(cfg: any, declaration?: any) {
    // gotta figure out how to handle super calls

    this.name = cfg.name;
    this.declarations = [];
    this.parseDeclarations(cfg);
    this.options = cfg.options;
  }

  private parseDeclarations(cfg): void {
    var self = this;
    let props = cfg.props;
    var isListCfg = check.isArray(props);

    if (isListCfg) {
      props.forEach(function(str) {
        self.declarations.push(DeclarationFactory.create(str, cfg));
      });
    } else { // inferred
      _.forIn(props, function(value, key) {
        var str;
        if (value) {
          var type = check.discernType(value);
          str = type === 'function' ? key + '()' : [key, type].join(':');
        }
        str = key;

        self.declarations.push(DeclarationFactory.create(str))
      });
    }
  };
  public setKey(key: string): void {
    this.key = key;
  }
  public validate(val: any): boolean {
    let hasDeclarations: boolean = !!this.declarations.length || !!this.i;
    let isCollection = !!this.collection;
    let isValid: boolean = hasDeclarations ?
      this.validateInterface(val) :
      (isCollection ?
        this.validateCollection(val) :
        this.validateDeclaration(val));
    return isValid;
  }

  private validateInterface(iterable): boolean {
    let declarations = this.declarations;
    let passes: boolean = false;
    let isCollection = check.isArray(iterable);
    if (!iterable) {
      return passes;
    }
    if (!isCollection) { // supports functions with props attached (lodash)
      passes = declarations.every(function(declaration: iDeclaration, idx: number, array: iDeclaration[]) {
        let key: string = declaration.key;
        let value = iterable ? iterable[key] : undefined;
        // if this is also an interface, this will run validate again
        return iterable ? declaration.validate(value) : false;
      });
    } else { // when we want to validate a collection
      passes = this.validateCollection(iterable);
    }
    return passes ? true : false;
  }



  private validateCollection(val): boolean {
    var itemDeclaration = this.declarations[0];
    if (itemDeclaration) {
      var passes = val.every(function(item) {
        return itemDeclaration.validate(item);
      });
    } else {
      var registry = require('../services/BridgeService').Registry;
      var type = this.collection;
      var validator = check.getChecker(type);
      var iface = registry.get(type);
      var passes = val.every(function(item) {
        if (iface) {
          return iface.validate(item)
        } else {
          return validator(item);
        }
      });
    }

    return passes;
  }

  private validateDeclaration(val): boolean {
    var isRequired = this.required;
    var isMethod = this.method;
    var type = this.type;
    let i = this.i;
    let passes = true;
    // this is where all conditions must be considered
    if (isRequired && i !== null) { passes = i.validate(val) }
    else if (isRequired && val !== null && !val) { passes = false }
    else if (isRequired && isMethod && !check.isFunction(val)) { passes = false }
    else if (type && check.discernType(val) !== type) { passes = false }

    // if (!passes) {
    //   this.appendError();
    // }
    return passes;
  }

  private appendError() {
    console.log(this);
  }
}
