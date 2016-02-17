var isArray = function(context) {
    return context instanceof(Array);
}
var isString = function(context) {
    return context instanceof(String);
}
var isObject = function(context) {
    return context instanceof(Object) 
      && !isArray(context)
      && !isNumber(context);
}
var isNumber = function(context) {
    return context instanceof(Number);
}
var isError = function(context) {
    return context instanceof(Error);
}
var isFunction = function(context) {
  return !!(context && context.constructor && context.call && context.apply);
}; 


module.exports = {
  isArray:isArray,
  isString: isString,
  isObject: isObject, 
  isNumber: isNumber, 
  isError: isError,
  isFunction: isFunction
}