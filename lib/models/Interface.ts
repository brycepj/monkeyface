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
  
  constructor(cfg:iCreateInterfaceConfig) {
    this.name = cfg.name;
    this.declarations = [];
    this.parseDeclarations(cfg);
    this.options = cfg.options;
    
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
  public setKey(key:string):void {
    this.key = key;
  }
  public validate(val:any):any {
    // this method should return the boolean and throw an error on misses
    
    let declarations = this.declarations;
    let iterable:any = (check.isObject(val) || 
      check.isFunction(val) || 
      check.isArray(val)) ? val : u.returnError("Need to pass an iterable.");
    let passes:boolean = false;
    
    if (check.isObject(iterable) || check.isFunction(iterable)) { // supports functions with props attached (lodash)
      passes = declarations.every(function (declaration:iDeclaration, idx:number, array:iDeclaration[]) {
        let key:string = declaration.key;
        return declaration.validate(iterable[key]);
      });
    } else if(check.isArray(iterable)) { // when we want to validate a collection
     var itemDeclaration = declarations[0];
     passes = iterable.every(function(item) {
       return itemDeclaration.validate(item);
     });
    } 
    return passes ? val : false;
  }
  

}
