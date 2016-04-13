import {iInterface, iDeclaration} from '../interfaces/Models';
import {iCreateInterfaceConfig} from '../interfaces/Config';
import DeclarationFactory = require('../factories/DeclarationFactory');
import check = require('../services/typeChecker');
import u = require('../services/utils');
import _ = require('lodash');

export class Interface implements iInterface {

  public declarations: iDeclaration[];
  public name: string;
  public key: any;
  public options: any;

  constructor(cfg: iCreateInterfaceConfig, declaration?: iDeclaration) {
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
    let isValid: boolean = hasDeclarations ?
      this.validateInterface(val) :
      this.validateDeclaration(val);
    return isValid;
  }

  private validateInterface(iterable): boolean {
    let declarations = this.declarations;
    let passes: boolean = false;
    let isCollection = check.isArray(iterable);

    if (!isCollection) { // supports functions with props attached (lodash)
      passes = declarations.every(function(declaration: iDeclaration, idx: number, array: iDeclaration[]) {
        let key: string = declaration.key;
        let value = iterable[key];
        // if this is also an interface, this will run validate again
        return declaration.validate(value);
      });
    } else { // when we want to validate a collection
      passes = this.validateCollection(iterable);
    }
    return passes ? true : false;
  }



  private validateCollection(val): boolean {
    var itemDeclaration = this.declarations[0];
    let passes = val.every(function(item) {
      return itemDeclaration.validate(item);
    });
    return passes;
  }

  private validateDeclaration(val) {
    var isRequired = this.required;
    var isMethod = this.method;
    var type = this.type;
    let i = this.i;
    // this is where all conditions must be considered
    if (isRequired && i !== null) { return i.validate(val) }
    else if (isRequired && val !== null && !val) { return false }
    else if (isRequired && isMethod && !check.isFunction(val)) { return false }
    else if (type && check.discernType(val) !== type) { return false }

    return true;
  }
}
