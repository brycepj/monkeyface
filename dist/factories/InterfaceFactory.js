"use strict";
var check = require('../services/typeChecker');
var u = require('../services/utils');
var Declaration_1 = require('../models/Declaration');
var Interface_1 = require('../models/Interface');
var InterfaceFactory = (function () {
    function InterfaceFactory() {
    }
    InterfaceFactory.prototype._parseCfg = function (cfg) {
        var self = this;
        var isListCfg = check.isArray(cfg);
        var isInferredCfg = check.isObject(cfg);
        if (isListCfg) {
            cfg.forEach(function (str) {
                self.declarations.push(new Declaration_1.Declaration(str));
            });
        }
        else if (isInferredCfg) {
            u.forIn(cfg, function (value, key) {
                var type = check.discernType(value);
                var str = type === 'function' ? key + '()' : [key, type].join(':');
                self.declarations.push(new Declaration_1.Declaration(str));
            });
        }
    };
    ;
    InterfaceFactory.prototype.validate = function (iterable) {
        var checkAll = this.declarations.every(function (declaration, idx) {
            var key = declaration.key;
            var val = iterable[key];
            return declaration.validate(val, key);
        });
        return checkAll ? iterable : false;
    };
    ;
    InterfaceFactory.prototype.create = function (name, rawProps, options) {
        var props = this.parseConfigProps(rawProps);
        var cfg = { name: name, props: props, options: options };
        return new Interface_1.Interface(cfg);
    };
    ;
    InterfaceFactory.prototype.parseConfigProps = function (propsInput) {
        var inputType = check.discernType(propsInput), props = [];
        if (inputType === 'string') {
            props.push(propsInput);
        }
        else if (inputType === 'object' || inputType === 'function') {
            u.forIn(function (val, key) { var type = check.discernType(val), str = [key, type].join(':'); props.push(str); });
        }
        else if (inputType === 'array') {
            props = propsInput;
        }
        else {
            return u.returnError(inputType, "Pass valid config arguments (string, object or array)");
        }
        return props;
    };
    return InterfaceFactory;
}());
module.exports = new InterfaceFactory();
