"use strict";
global['__stack'] = function () {
    var orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function (_, stack) { return stack; };
    var err = new Error;
    Error.captureStackTrace(err, arguments.callee);
    var stack = err.stack;
    Error.prepareStackTrace = orig;
    return stack;
};
var StackTrace = (function () {
    function StackTrace() {
        this.setStack();
        this.getOrigin = this.flexibleCallsiteWrapper('getEvalOrigin');
        this.getLineNumber = this.flexibleCallsiteWrapper('getLineNumber');
        this.getFunctionName = this.flexibleCallsiteWrapper('getFunctionName');
        this.getFileName = this.flexibleCallsiteWrapper('getFileName');
        this.getMethodName = this.flexibleCallsiteWrapper('getMethodName');
        this.getColumnNumber = this.flexibleCallsiteWrapper('getColumnNumber');
        this.getContext = this.flexibleCallsiteWrapper('getThis');
    }
    StackTrace.prototype.setStack = function () {
        this.list = __stack();
    };
    StackTrace.prototype.flexibleCallsiteWrapper = function (method) {
        return function (idx, site) {
            return site ? site[method]() : this.list[idx][method]();
        };
    };
    return StackTrace;
}());
exports.StackTrace = StackTrace;
