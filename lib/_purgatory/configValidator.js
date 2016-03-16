var _ = require('lodash');
var utils = require('./utils');
var validLogLevels = ['silent', 'warn', 'debug', 'error'];
var logLevel = function (cfg) {
    var level = cfg.logLevel;
    return validLogLevels.indexOf(level) > -1 ? cfg : utils.returnError("Invalid logLevel passed: " + level);
};
var globalKey = function (cfg) {
    var prefix = '__';
    var key = cfg.globalKey;
    var fails = key === 'interfaces'
        || key.charAt(0) === '_'
        || global[prefix + key]
        || window[prefix + key];
    return !fails ? cfg : utils.returnError("Invalid globalKey passed: " + key);
};
var applyValidators = function (initial, fnArr) {
    var curr = initial;
    _.forEach(fnArr, function (fn, idx) {
        curr = fn(curr);
    });
    return curr;
};
module.exports = function (cfg) {
    return applyValidators([logLevel, globalKey]);
};
