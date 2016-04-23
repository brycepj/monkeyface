"use strict";
var check = require('../services/typeChecker');
var maybeThrow = require('../services/maybeThrow');
var StackTrace_1 = require('../utils/StackTrace');
var TypeCheckError_1 = require('../utils/TypeCheckError');
function ensure(type) {
    var Bridge = require('../services/BridgeService');
    var self = this;
    var stack = new StackTrace_1.StackTrace();
    switch (type) {
        case 'string':
            maybeThrow(check.isString(self), type, self, stack);
            break;
        case 'array':
            maybeThrow(check.isArray(self), type, self, stack);
            break;
        case 'number':
            maybeThrow(check.isNumber(self), type, self, stack);
            break;
        case 'error':
            maybeThrow(check.isError(self), type, self, stack);
            break;
        case 'function':
            maybeThrow(check.isFunction(self), type, self, stack);
            break;
        case 'object':
            maybeThrow(check.isObject(self), type, self, stack);
            break;
        case 'boolean':
            maybeThrow(check.isBoolean(self), type, self, stack);
            break;
        case 'date':
            maybeThrow(check.isDate(self), type, self, stack);
            break;
        default:
            maybeCatch(type, self, stack);
            break;
    }
    return self;
}
function maybeCatch(type, val, stack) {
    var Bridge = require('../services/BridgeService');
    try {
        var ensured = Bridge.ensureComplex(type, val);
    }
    catch (err) {
        if (err instanceof TypeCheckError_1.DeclarationError) {
            stack.setDetail(err);
        }
        else {
            throw err;
        }
    }
    maybeThrow(ensured, type, val, stack);
}
module.exports = (function () {
    return ensure;
})();
