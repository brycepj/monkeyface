
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
      let isCollection = type.indexOf('[]') > -1 ||
        check.isValidType(type.slice(0, -1)) ||
        Bridge.Registry.check(type.slice(0, -1));
      // console.log('isCollection', isCollection, type, Bridge.Registry.listKeys());
      // TODO: This checking/splitting should be handled elsewhere.
      (check.isString(type) && isCollection) ?
        maybeThrow(Bridge.ensureCollection(type, self), type, self) :
        maybeThrow(Bridge.ensureImplements(type, self), type, self);

      break;
  }

  return self;
}

export = (function() {
  return ensure;
})();

