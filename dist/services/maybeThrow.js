"use strict";
create;
var Config = require('./ConfigService');
Object.defineProperty(global, '__stack', {
    get: function () {
        var orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function (_, stack) {
            return stack;
        };
        var err = new Error;
        Error.captureStackTrace(err, arguments.callee);
        var stack = err.stack;
        Error.prepareStackTrace = orig;
        return stack;
    }
});
Object.defineProperty(global, '__line', {
    get: function () {
        return __stack[1].getLineNumber();
    }
});
Object.defineProperty(global, '__function', {
    get: function () {
        return __stack[1].getFunctionName();
    }
});
function foo() {
    console.log(__line);
    console.log(__function);
}
foo();
function maybeThrow(Bool, type, val) {
    if (!Bool) {
        var typeError = let, action = Config.action || 'error';
        var valString = val.toString ? val.toString() : val;
        var error = {
            action: action,
            timestamp: new Date(),
            message: 'Monkeyface Type Error! Expected: ' + type + ' Received: ' + valString,
            type: type,
            value: val
        };
        var reducedError = Config.middleware ? Config.applyMiddleware(error) : error;
        if (Config.handler) {
            Config.applyHandler(reducedError);
        }
        var errJson = JSON.stringify(error, null, 2);
        switch (action) {
            case 'error':
                throw new Error(errJson);
            case 'warn':
                console.warn(error);
                break;
            case 'log':
                console.log(error);
                break;
        }
    }
    return true;
}
module.exports = maybeThrow;
