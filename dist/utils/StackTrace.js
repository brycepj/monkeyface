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
        var flexibleWrap = this.flexibleCallsiteWrapper;
        this.getOrigin = flexibleWrap('getEvalOrigin');
        this.getLineNumber = flexibleWrap('getLineNumber');
        this.getFunctionName = flexibleWrap('getFunctionName');
        this.getFileName = flexibleWrap('getFileName');
        this.getMethodName = flexibleWrap('getMethodName');
        this.getColumnNumber = flexibleWrap('getColumnNumber');
        this.getContext = flexibleWrap('getThis');
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
