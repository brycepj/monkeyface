import {Interface} from './Interface';
import {iDeclaration} from '../interfaces/Models';
var check = require('../services/typeChecker');

export class Declaration extends Interface {
  public key: string;
  public required: boolean;
  public type: string;
  public method: boolean;
  public i: any;
  public collection: any;
  constructor(configString: string, iface?: any) {
    // FIXME: This signature doesn't match the super's
    super(configString);
    // the constructor is passed the string passed by the user (e.g. 'hello:string')
    // or the inferred string generated during Interface construction
    this.key = null;
    this.required = null;
    this.type = null;
    this.method = null;
    this.i = iface ? { name: iface.name, instance: iface } : null;
    this.declarations = iface ? iface.declarations : [];
    this.parseDeclarationString(configString);
  }

  private parseDeclarationString(configString: string): void {
    let registry = require('../services/BridgeService').Registry;
    let hasType = configString.indexOf(':') > -1;
    let type = hasType ? configString.split(':')[1] : null;
    let depluralizedType = type ? type.slice(0, -1) : null;
    let isParamCollection = check.isValidType(depluralizedType) || registry.check(depluralizedType);
    let isCollection = type ? type.indexOf('[]') > -1 : false;
    let isInterface = hasType && registry.check(type);
    var isMethod = configString.indexOf('()') > -1;
    var isRequired = configString.indexOf('?') === -1;

    this.required = isRequired;
    this.method = isMethod;
    this.type = isMethod ? 'function' : type;
    this.type = isParamCollection ? depluralizedType : type;
    this.collection = isCollection && !isParamCollection ? type.slice(0, -2) : null;
    this.i = isInterface && this.i === null ? { name: type, instance: registry.get(type) } : null;
    this.key = this.parsePropertyKey(configString);
  };

  private parsePropertyKey(configString: string): string {
    configString = this.type ? configString.split(':')[0] : configString;
    configString = !this.required ? configString.slice(0, -1) : configString;
    configString = this.method ? configString.slice(0, -2) : configString;
    return configString;
  };

  // public validate(val) {
  //   var isRequired = this.required;
  //   var isMethod = this.method;
  //   var type = this.type;
  //   let i = this.i;
  //   // this is where all conditions must be considered
  //   if (isRequired && i !== null) { return i.validate(val) }
  //   else if (isRequired && val !== null && !val) { return false }
  //   else if (isRequired && isMethod && !check.isFunction(val)) { return false }
  //   else if (type && check.discernType(val) !== type) { return false }

  //   return true;
  // }
}

/*
validatorObj = {
  name:'required'
  validator: () => {
    
  }
};

*/
