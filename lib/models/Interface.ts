import {iInterface} from '../interfaces/Models';

var check = $require('services/typeChecker');
var u = $require('services/utils');

export class Interface implements iInterface {
  constructor(name, cfg) {
    this.name = name;
    this.declarations = [];
    this._parseCfg(cfg);
  }

  _parseCfg(cfg) {
    var Declaration = $require('models/Declaration');
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
  

}
