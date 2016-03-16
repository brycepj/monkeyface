var isArray = function(context) {
    return context instanceof(Array);
};
isArray.type = 'array';

var isString = function(context) {
    return context instanceof(String) || typeof context === 'string';
};
isString.type = 'string';

var isObject = function(context) {
    return typeof context == 'object' 
      && !isArray(context)
      && !isNumber(context)
			&& !isNull(context)
			&& !isError(context)
			&& !isDate(context);
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
var isInterface = function(iterable, value){
	var Interface = $require('factories/InterfaceFactory');
  var isKey = isString(value);
	var iface = isKey ? Interface.getInterface(value) : isValidInterface(value);
	return iface && Interface.ensureImplements(iterable, iface);
};

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
  discernType: discernType
}