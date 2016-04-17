
var check = require('../services/typeChecker');
var maybeThrow = require('../services/maybeThrow');

function ensure(type: string) {
  var Bridge = require('../services/BridgeService');

  var self = this;

  switch (type) {
    case 'string':
      maybeThrow(check.isString(self), type, self);
      break;
    case 'array':
      maybeThrow(check.isArray(self), type, self);
      break;
    case 'number':
      maybeThrow(check.isNumber(self), type, self);
      break;
    case 'error':
      maybeThrow(check.isError(self), type, self);
      break;
    case 'function':
      maybeThrow(check.isFunction(self), type, self);
      break;
    case 'object':
      maybeThrow(check.isObject(self), type, self);
      break;
    case 'boolean':
      maybeThrow(check.isBoolean(self), type, self);
      break;
    case 'date':
      maybeThrow(check.isDate(self), type, self);
      break;
    default:
      maybeThrow(Bridge.ensureComplex(type, self), type, self);
      break;
  }

  return self;
}

export = (function() {
  return ensure;
})();
