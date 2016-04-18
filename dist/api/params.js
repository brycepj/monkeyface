var Config = require('../services/ConfigService');
function params() {
    var fn = this;
    var args = arguments;
    var fnStr = fn.toString();
    var paramsStrArr = getParamNames(fn);
    paramsStrArr.forEach(function (param, index) {
        var pieces = param.split('$');
        var type = pieces.length == 2 ? pieces[1] : pieces[0];
        var val = args[index];
        val[Config.ensureKey](type);
    });
    return this.apply(null, arguments);
}
;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(func) {
    var fnStr = func.toString().replace(STRIP_COMMENTS, '');
    var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    return result === null ? [] : result;
}
module.exports = params;
