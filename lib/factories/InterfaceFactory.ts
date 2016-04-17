var check = require('../services/typeChecker');
var u = require('../services/utils');
import {Declaration} from '../models/Declaration';
import {Interface} from '../models/Interface';

class InterfaceFactory {
  public declarations: any;
  constructor() { }

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
  create(name?, rawProps?, options?) {
    let props = this.parseConfigProps(rawProps);
    let cfg = { name: name, props: props, options: options };
    return new Interface(cfg);
  };
  
  private parseConfigProps(propsInput: any): i {
    var inputType: string = check.discernType(propsInput),
      props: any[] = [];
    if (inputType === 'string') {
      props.push(propsInput)
    } else if (inputType === 'object' || inputType === 'function') {
      u.forIn((val, key) => { let type = check.discernType(val), str = [key, type].join(':'); props.push(str) });
    } else if (inputType === 'array') {
      props = propsInput;
    } else {
      return u.returnError(inputType, "Pass a valid configuration argumentation.");
    }
    return props;
  }
}

export = new InterfaceFactory();
