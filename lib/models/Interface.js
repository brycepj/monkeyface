var DeclarationFactory = require('../factories/DeclarationFactory');
var check = require('../services/typeChecker');
var _ = require('lodash');
var Interface = (function () {
    function Interface(cfg, declaration) {
        this.name = cfg.name;
        this.declarations = [];
        this.parseDeclarations(cfg);
        this.options = cfg.options;
    }
    Interface.prototype.parseDeclarations = function (cfg) {
        var self = this;
        var props = cfg.props;
        var isListCfg = check.isArray(props);
        if (isListCfg) {
            props.forEach(function (str) {
                self.declarations.push(DeclarationFactory.create(str, cfg));
            });
        }
        else {
            _.forIn(props, function (value, key) {
                var str;
                if (value) {
                    var type = check.discernType(value);
                    str = type === 'function' ? key + '()' : [key, type].join(':');
                }
                str = key;
                self.declarations.push(DeclarationFactory.create(str));
            });
        }
    };
    ;
    Interface.prototype.setKey = function (key) {
        this.key = key;
    };
    Interface.prototype.validate = function (val) {
        var hasDeclarations = !!this.declarations.length || !!this.i;
        var isCollection = !!this.collection;
        var isValid = hasDeclarations ?
            this.validateInterface(val) :
            (isCollection ?
                this.validateCollection(val) :
                this.validateDeclaration(val));
        return isValid;
    };
    Interface.prototype.validateInterface = function (iterable) {
        var declarations = this.declarations;
        var passes = false;
        var isCollection = check.isArray(iterable);
        if (!iterable) {
            return passes;
        }
        if (!isCollection) {
            passes = declarations.every(function (declaration, idx, array) {
                var key = declaration.key;
                var value = iterable ? iterable[key] : undefined;
                return iterable ? declaration.validate(value) : false;
            });
        }
        else {
            passes = this.validateCollection(iterable);
        }
        return passes ? true : false;
    };
    Interface.prototype.validateCollection = function (val) {
        var itemDeclaration = this.declarations[0];
        if (itemDeclaration) {
            var passes = val.every(function (item) {
                return itemDeclaration.validate(item);
            });
        }
        else {
            var registry = require('../services/BridgeService').Registry;
            var type = this.collection;
            var validator = check.getChecker(type);
            var iface = registry.get(type);
            var passes = val.every(function (item) {
                if (iface) {
                    return iface.validate(item);
                }
                else {
                    return validator(item);
                }
            });
        }
        return passes;
    };
    Interface.prototype.validateDeclaration = function (val) {
        var isRequired = this.required;
        var isMethod = this.method;
        var type = this.type;
        var i = this.i;
        var passes = true;
        if (isRequired && i !== null) {
            passes = i.validate(val);
        }
        else if (isRequired && val !== null && !val) {
            passes = false;
        }
        else if (isRequired && isMethod && !check.isFunction(val)) {
            passes = false;
        }
        else if (type && check.discernType(val) !== type) {
            passes = false;
        }
        return passes;
    };
    Interface.prototype.appendError = function () {
        console.log(this);
    };
    return Interface;
})();
exports.Interface = Interface;
//# sourceMappingURL=Interface.js.map