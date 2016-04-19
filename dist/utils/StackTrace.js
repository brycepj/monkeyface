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
    }
    StackTrace.prototype.setStack = function () {
        this.list = __stack();
    };
    StackTrace.prototype.getLineNumber = function (idx) {
        return this.list[idx].getLineNumber();
    };
    StackTrace.prototype.getFunctionName = function (idx) {
        return this.list[idx].getFunctionName();
    };
    StackTrace.prototype.getFileName = function (idx) {
        return this.list[idx].getFileName();
    };
    StackTrace.prototype.getMethodName = function (idx) {
        return this.list[idx].getMethodName();
    };
    StackTrace.prototype.getColumnNumber = function (idx) {
        return this.list[idx].getColumnNumber();
    };
    StackTrace.prototype.getContext = function (idx) {
        return this.list[idx].getThis();
    };
    StackTrace.prototype.getOrigin = function (idx) {
        return this.list[idx].getEvalOrigin();
    };
    return StackTrace;
}());
exports.StackTrace = StackTrace;
