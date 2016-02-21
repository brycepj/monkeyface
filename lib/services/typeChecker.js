var isArray = function(context) {
    return context instanceof(Array);
};
isArray.type = 'array';

var isString = function(context) {
    return context instanceof(String) || typeof context === 'string';
};
isString.type = 'string';

var isObject = function(context) {
    return context instanceof(Object) 
      && !isArray(context)
      && !isNumber(context);
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

var discernType = function (val) {
   return [isNull, isBoolean, isString, isNumber, isFunction, isError, isArray, isObject]
    .find(function(fn, index){
       return fn(val);
     }).type;
};


module.exports = {
  isArray:isArray,
  isString: isString,
  isObject: isObject, 
  isNumber: isNumber, 
  isError: isError,
  isFunction: isFunction,
  discernType: discernType
}