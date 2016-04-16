var check = require('../services/typeChecker');
var u = require('../services/utils');
import {Declaration} from '../models/Declaration';
import {Interface} from '../models/Interface';

class InterfaceFactory {
  public declarations: any;
  constructor() { 
    
  }

  _parseCfg(cfg) {

    var self = this;
    var isListCfg = check.isArray(cfg);
    var isInferredCfg = check.isObject(cfg);

    if (isListCfg) {
      cfg.forEach(function(str) {
        self.declarations.push(new Declaration(str));
      });
    } else if (isInferredCfg) {
      u.forIn(cfg, function(value, key) {
        var type = check.discernType(value);
        var str = type === 'function' ? key + '()' : [key, type].join(':');
        self.declarations.push(new Declaration(str))
      });
    }
  };
  validate(iterable) {
    var checkAll = this.declarations.every(function(declaration, idx) {
      var key = declaration.key;
      var val = iterable[key];
      return declaration.validate(val, key);
    });
    return checkAll ? iterable : false;
  };
  // TODO: As an optimization, consider using subclasses for various levels of parsing required
  create(cfg) {
    // various private methods to create
    return new Interface(cfg);
  };
}

export = new InterfaceFactory();
