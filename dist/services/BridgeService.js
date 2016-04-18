"use strict";
var u = require('./utils');
var check = require('./typeChecker');
var Bridge = (function () {
    function Bridge() {
        require('../patchers/index');
        this.Registry = require('./RegistryService');
        this.Interface = require('../factories/InterfaceFactory');
        this.Declaration = require('../factories/DeclarationFactory');
    }
    Bridge.prototype.createInterface = function (name, props, options) {
        var iface = this.Interface.create(name, props, options);
        this.Registry.register(iface);
        return iface;
    };
    ;
    Bridge.prototype.getInterface = function (name) {
        return this.Registry.get(name);
    };
    Bridge.prototype.ensureCollection = function (key, arr) {
        var typeStr = this.getCollectionKey(key);
        var checker = check.getChecker(typeStr) || this.Registry.get(typeStr);
        return arr.every(function (item, idx) {
            checker = checker.validate ? checker.validate.bind(checker) : checker;
            return checker(item);
        });
    };
    Bridge.prototype.ensureImplements = function (iface, val) {
        var iterable = !!val ? val : u.returnError('Need to pass an iterable to ensureImplements');
        var registeredInterface = this.Registry.get(iface);
        return registeredInterface.validate(iterable);
    };
    ;
    Bridge.prototype.ensureComplex = function (type, val) {
        return !!this.getCollectionKey(type) ?
            this.ensureCollection(type, val) :
            this.ensureImplements(type, val);
    };
    Bridge.prototype.getCollectionKey = function (str) {
        var hasBrackets = str.indexOf('[]') > -1;
        var bracketlessType = hasBrackets ? str.slice(0, -2) : null;
        var singularType = str.slice(0, -1);
        var isPluralType = !hasBrackets && check.isValidType(singularType);
        var isPluralInterface = !isPluralType && this.Registry.check(singularType);
        return (hasBrackets || isPluralInterface || isPluralType) ?
            (hasBrackets ? bracketlessType : singularType) : false;
    };
    return Bridge;
}());
module.exports = new Bridge();
