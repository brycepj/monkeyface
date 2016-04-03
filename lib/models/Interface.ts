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
    // this.declaration = declaration;

  }

  private parseDeclarations(cfg) { // takes a config object, creates and stores declarations for each
    // props could be an array of strings to parse, or an object to infer from
    // Interface-level config should be determined here
    // Declaration level config should be determined in the Declaration parsing 

    var self = this;
    let props = cfg.props;
    var isListCfg = check.isArray(props);

    if (isListCfg) {
      props.forEach(function(str) {
        self.declarations.push(DeclarationFactory.create(str, cfg));
      });
    } else {
      _.forIn(props, function(value, key) {
        var type = check.discernType(value);
        var str = type === 'function' ? key + '()' : [key, type].join(':');
        self.declarations.push(DeclarationFactory.create(str))
      });
    }
  };
  public setKey(key: string): void {
    this.key = key;
  }
  public validate(val: any): boolean {
    let hasDeclarations = !!this.declarations.length;
    return hasDeclarations ? this.validateInterface(val) : this.validateDeclaration(val);
  }

  private validateInterface(iterable) {
    let declarations = this.declarations;
    let passes: boolean = false;
    let isCollection = check.isArray(iterable);

    if (!isCollection) { // supports functions with props attached (lodash)
      passes = declarations.every(function(declaration: iDeclaration, idx: number, array: iDeclaration[]) {
        let key: string = declaration.key;
        // if this is also an interface, this will run validate again
        return declaration.validate(iterable[key]);
      });
    } else { // when we want to validate a collection
      passes = this.validateCollection(iterable);
    }
    return passes ? true : false;
  }

  private validateDeclaration(val) {
    var Bridge = require('../services/BridgeService');
    var isRequired = this.required;
    var isMethod = this.method;
    var type = this.type;
    
    // this is where all conditions must be considered
    if (isRequired && val !== null && !val) { return false }
    else if (isMethod && !check.isFunction(val)) { return false }
    else if (type && check.discernType(val) !== type
      && !Bridge.ensureImplements(type, val)) { return false } // type must be primitive

    return true;
  }

  private validateCollection(val) {
    var itemDeclaration = declarations[0];
    let passes = iterable.every(function(item) {
      return itemDeclaration.validate(item);
    });
    return passes;
  }


}
