
var check = $require('services/typeChecker');
var maybeThrow = $require('services/maybeThrow');

function implement (type) {
  
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
    case 'function':
      maybeThrow(check.isFunction(this), type, this);
      break;
    case 'object':
       maybeThrow(check.isObject(this), type, this);
      break;
		case 'boolean':
      maybeThrow(check.isBoolean(this), type, this);
      break;
		case 'date':
      maybeThrow(check.isDate(this), type, this);
      break;
    default:
     maybeThrow(check.isInterface(this, type), type, this);
     break;
   }
   return this;
}

module.exports = (function(){
	return implement;
})();

