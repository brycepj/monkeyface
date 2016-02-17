var check = require('./services/typeChecker');
var maybeThrow = require('./services/maybeThrow');

function is (type) {
   switch (type) {
    case 'string':
       maybeThrow(check.isString(this), type, this);
       break;
    case 'array':
      maybeThrow(check.isArray(this), type, this);
      break;
    case 'number':
      maybeThrow(check.isNumber(this), type, this);
      break;
    case 'error': 
       maybeThrow(check.isError(this), type, this);
      break;
    case 'object':
       maybeThrow(check.isObject(this), type, this);
      break;
    default:
      console.warn('No type matched');
     break;
   }

   return this;
}

module.exports = is;
