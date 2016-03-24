var isArray = function(context) {
    return context instanceof(Array);
};
isArray.type = 'array';

var isString = function(context) {
    return context instanceof(String) || typeof context === 'string';
};
isString.type = 'string';

var isObject = function(context) {
  let isntArray = !isArray(context);
  let isntNumber =!isNumber(context)
	let isntNull = !isNull(context)
	let isntError = !isError(context)
	let isntDate = !isDate(context);
    return typeof context == 'object' && isntArray && isntDate && isntNumber && isNull && isntError;
};
isObject.type = 'object';

var isNumber = function(context) {
    return context instanceof(Number) || typeof context === 'number';
};
isNumber.type = 'number';

var isError = function(context) {
    return context instanceof(Error);
};
isError.type = 'error';

var isFunction = function(context) {
  return !!(context && context.constructor && context.call && context.apply);
}; 
isFunction.type = 'function';


var isBoolean = function (context) {
   return context === true || context === false || toString.call(context) == '[object Boolean]'; 
};
isBoolean.type = 'boolean';

var isNull = function(context) {
	return context === null;
}
isNull.type = 'null';


var isDate = function(context) {
	return context instanceof Date;
};
isDate.type = 'date';

var discernType = function (val) {
   return [isNull, isBoolean, isString, isNumber, isFunction, isError, isArray, isObject, isDate]
    .find(function(fn, index){
       return fn(val);
     }).type;
};

// internal
var implementsInterface = function(iterable, ifaceKey){
	let registry = require('../services/BridgeService').Registry;
  let u = require('./utils');
	let iface = (isString(ifaceKey) && registry.check(ifaceKey)) ? registry.get(ifaceKey) : u.returnError('badifacekeybreej');
	return iface.validate(iterable);
};

var isInterface = function(val) {
  var registry = require('../services/BridgeService').Registry;
  return registry.check(val) || (isObject(val) && val.declarations);
}

var isValidInterface = function(value) {
  return (value.declarations && value.name) ? value : false;
};

var manualCheck = function(val, type) {
  
};

export = {
  isArray:isArray,
  isString: isString,
  isObject: isObject, 
  isNumber: isNumber, 
  isError: isError,
  isFunction: isFunction,
	isNull: isNull,
	isBoolean: isBoolean,
	isDate: isDate,
  isInterface: isInterface,
	implementsInterface: implementsInterface,
  discernType: discernType
}