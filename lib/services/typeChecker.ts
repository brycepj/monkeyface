import u = require('./utils');
var Types = require('./Types');

function valueChecker(typeName, checker): any {
  let toReturn = function(context: any): boolean { return checker(context) };
  toReturn['type'] = typeName;
  return toReturn;
};

var isArray = valueChecker('array', function(context) {
  return context instanceof (Array);
});

var isString = valueChecker('string', function(context) {
  return context instanceof (String) || typeof context === 'string';
});

var isObject = valueChecker('object', function(context) {
  return typeof context == 'object' && !isArray(context) && !isDate(context) && !isError(context);
});

var isNumber = valueChecker('number', function(context) {
  return context instanceof (Number) || typeof context === 'number';
});

var isError = valueChecker('error', function(context) {
  return context instanceof (Error);
});

var isFunction = valueChecker('function', function(context) {
  return !!(context && context.constructor && context.call && context.apply);
});

var isBoolean = valueChecker('boolean', function(context) {
  return context === true || context === false || toString.call(context) == '[object Boolean]';
});

var isNull = valueChecker('null', function(context) {
  return context === null;
});

var isDate = valueChecker('date', function(context) {
  return context instanceof Date;
});

var isValidType = (str) => {
  return Types.Names.indexOf(str) > -1;
}
var discernType = function(val) {
  // it is important that isInterface come before isString, as interfaces are represented as strings
  return [isValidInterface, isNull, isBoolean, isString, isNumber, isFunction, isError, isArray, isObject, isDate]
    .find(function(fn, index) {
      return fn(val);
    }).type;
};

var typeByVal = function(val, type) {
  let actualType = discernType(val);
  return actualType === type;
};

var getChecker = (type) => {
  var fn;
  var itemType = type; //type.slice(0, -2);
  u.forIn(checkers, (checker) => {
    if (isFunction(checker) && checker.type && checker.type === itemType) {
      fn = checker;
    }
  });
  return fn;
}
// internal

var isValidInterface:any = function(value, ifaceName?: string) {
  if (ifaceName) { this.type = ifaceName };
  return value !== null && (value.declarations && value.name) ? true : false;
};
isValidInterface.type = 'interface';

var checkers: any = module.exports = {
  isArray: isArray,
  isString: isString,
  isObject: isObject,
  isNumber: isNumber,
  isError: isError,
  isFunction: isFunction,
  isNull: isNull,
  isBoolean: isBoolean,
  isDate: isDate,
  isInterface: isValidInterface,
  discernType: discernType,
  typeByVal: typeByVal,
  getChecker: getChecker,
  isValidType: isValidType
}