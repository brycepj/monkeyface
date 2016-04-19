declare var require: any;

var check = require('../services/typeChecker');
var maybeThrow = require('../services/maybeThrow');
import {StackTrace} from '../utils/StackTrace';

function ensure(type: string) {
  var Bridge = require('../services/BridgeService');

  let self = this;
  let stack = new StackTrace();

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

export = (function() {
  return ensure;
})();
