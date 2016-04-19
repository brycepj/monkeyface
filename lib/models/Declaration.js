var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Interface_1 = require('./Interface');
var check = require('../services/typeChecker');
var Declaration = (function (_super) {
    __extends(Declaration, _super);
    function Declaration(configString, iface) {
        _super.call(this, configString);
        this.key = null;
        this.required = null;
        this.type = null;
        this.method = null;
        this.i = iface ? { name: iface.name, instance: iface } : null;
        this.declarations = iface ? iface.declarations : [];
        this.parseDeclarationString(configString);
    }
    Declaration.prototype.parseDeclarationString = function (configString) {
        var registry = require('../services/BridgeService').Registry;
        var hasType = configString.includes(':');
        var type = hasType ? configString.split(':')[1] : null;
        var depluralizedType = type ? type.slice(0, -1) : null;
        var isParamCollection = check.isValidType(depluralizedType) || registry.check(depluralizedType);
        var isCollection = type ? type.includes('[]') : false;
        var isInterface = hasType && registry.check(type);
        var isMethod = configString.includes('()');
        var isRequired = !configString.includes('?');
        this.required = isRequired;
        this.method = isMethod;
        this.type = isMethod ? 'function' : type;
        this.type = isParamCollection ? depluralizedType : type;
        this.collection = isCollection && !isParamCollection ? type.slice(0, -2) : null;
        this.i = isInterface && this.i === null ? { name: type, instance: registry.get(type) } : null;
        this.key = this.parsePropertyKey(configString);
    };
    ;
    Declaration.prototype.parsePropertyKey = function (configString) {
        configString = this.type ? configString.split(':')[0] : configString;
        configString = !this.required ? configString.slice(0, -1) : configString;
        configString = this.method ? configString.slice(0, -2) : configString;
        return configString;
    };
    ;
    return Declaration;
})(Interface_1.Interface);
exports.Declaration = Declaration;
//# sourceMappingURL=Declaration.js.map