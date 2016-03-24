
import check = require('../services/typeChecker');
import maybeThrow = require('../services/maybeThrow');

function ensure(type) {

  var self = this;
  
  // if (val) {
  //   self = val;
  // }
  
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
      maybeThrow(check.implementsInterface(self, type), type, self);
      break;
  }

  // FIXME: Come up with a better abstraction here, or figure out how to get rid of this

  if (type === "string") {
    return self.toString();
  } else if (type === "number") {
    return Number(self);
  } else if (type === "boolean") {
    return Boolean(self);
  }

  return self;
}

export = (function() {
  return ensure
})();

