var isArray = function(context) {
    return context instanceof(Array);
}
var isString = function(context) {
    return context instanceof(String);
}
var isObject = function(context) {
    return context instanceof(Object);
}
var isNumber = function(context) {
    return context instanceof(Number);
}
var isError = function(context) {
    return context instanceof(Error);
}

module.exports = {
  isArray:isArray,
  isString: isString,
  isObject: isObject, 
  isNumber: isNumber, 
  isError: isError
}