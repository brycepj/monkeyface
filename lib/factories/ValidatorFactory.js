"use strict";
var check = require('../services/typeChecker');
var u = require('../services/utils');
var Interface_1 = require('../models/Interface');
var ValidatorFactory = (function () {
    function ValidatorFactory() {
    }
    ValidatorFactory.prototype._parseCfg = function (cfg) {
        var self = this;
        var isListCfg = check.isArray(cfg);
        var isInferredCfg = check.isObject(cfg);
        if (isListCfg) {
            cfg.forEach(function (str) {
                self.declarations.push(new Declaration(str));
            });
        }
        else if (isInferredCfg) {
            u.forIn(cfg, function (value, key) {
                var type = check.discernType(value);
                var str = type === 'function' ? key + '()' : [key, type].join(':');
                self.declarations.push(new Declaration(str));
            });
        }
    };
    ;
    ValidatorFactory.prototype.validate = function (iterable) {
        var checkAll = this.declarations.every(function (declaration, idx) {
            var key = declaration.key;
            var val = iterable[key];
            return declaration.validate(val, key);
        });
        return checkAll ? iterable : false;
    };
    ;
    ValidatorFactory.prototype.create = function (cfg) {
        return new Interface_1.Interface(cfg);
    };
    ;
    return ValidatorFactory;
}());
module.exports = new InterfaceFactory();
//# sourceMappingURL=ValidatorFactory.js.map