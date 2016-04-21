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
        this.list = __stack();
    }
    StackTrace.prototype.getOrigin = function (idx, site) {
        return this.flexibleCallsiteWrapper('getEvalOrigin', idx, site);
    };
    StackTrace.prototype.getLineNumber = function (idx, site) {
        return this.flexibleCallsiteWrapper('getLineNumber', idx, site);
    };
    StackTrace.prototype.getFunctionName = function (idx, site) {
        return this.flexibleCallsiteWrapper('getFunctionName', idx, site);
    };
    StackTrace.prototype.getFileName = function (idx, site) {
        return this.flexibleCallsiteWrapper('getFileName', idx, site);
    };
    StackTrace.prototype.getMethodName = function (idx, site) {
        return this.flexibleCallsiteWrapper('getMethodName', idx, site);
    };
    StackTrace.prototype.getColumnNumber = function (idx, site) {
        return this.flexibleCallsiteWrapper('getColumnNumber', idx, site);
    };
    StackTrace.prototype.getContext = function (idx, site) {
        return this.flexibleCallsiteWrapper('getThis', idx, site);
    };
    StackTrace.prototype.flexibleCallsiteWrapper = function (method, idx, site) {
        return site ? site[method]() : this.list[idx][method]();
    };
    ;
    return StackTrace;
}());
exports.StackTrace = StackTrace;
