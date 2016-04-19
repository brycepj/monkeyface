var check = require('../services/typeChecker');
var maybeThrow = require('../services/maybeThrow');
var StackTrace_1 = require('../utils/StackTrace');
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
            maybeThrow(Bridge.ensureComplex(type, self), type, self, stack);
            break;
    }
    return self;
}
module.exports = (function () {
    return ensure;
})();
//# sourceMappingURL=ensure.js.map