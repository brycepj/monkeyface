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
    return context instanceof(Number);
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


var isBoolean = function (obj) {
   return obj === true || obj === false || toString.call(obj) == '[object Boolean]'; 
};
isBoolean.type = 'boolean';


var discernType = function (val) {
   return [isBoolean, isString, isNumber, isFunction, isError, isArray, isObject]
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