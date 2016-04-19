var u = require('./utils');
var Types = require('./Types');
function valueChecker(typeName) {
    var toReturn = function (context) {
        var str = Object.prototype.toString.call(context);
        return str.indexOf(typeName) > -1;
    };
    toReturn['type'] = typeName.toLowerCase();
    return toReturn;
}
;
var isArray = valueChecker('Array');
var isString = valueChecker('String');
var isObject = valueChecker('Object');
var isNumber = valueChecker('Number');
var isError = valueChecker('Error');
var isFunction = valueChecker('Function');
var isBoolean = valueChecker('Boolean');
var isNull = valueChecker('Null');
var isDate = valueChecker('Date');
var isValidType = function (str) {
    return Types.Names.indexOf(str) > -1;
};
var discernType = function (val) {
    return isValidInterface(val) ?
        isValidInterface.type :
        Object.prototype.toString.call(val).slice(8, -1).toLowerCase();
};
var typeByVal = function (val, type) {
    var actualType = discernType(val);
    return actualType === type;
};
var getChecker = function (type, registry) {
    var fn;
    u.forIn(checkers, function (checker) {
        if (isFunction(checker) && checker.type && checker.type === type) {
            fn = checker;
        }
    });
    return fn;
};
var isValidInterface = function (value, ifaceName) {
    if (ifaceName) {
        this.type = ifaceName;
    }
    ;
    return value !== null && (value.declarations && value.name) ? true : false;
};
isValidInterface.type = 'interface';
var checkers = module.exports = {
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
};
//# sourceMappingURL=typeChecker.js.map