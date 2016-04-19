var u = require('../services/utils');
var CallSite = (function () {
    function CallSite(stack) {
        var index = this.findCallSiteIdx(stack);
        this.functionName = stack.getFunctionName(index);
        this.lineNumber = stack.getLineNumber(index);
        this.fileName = stack.getFileName(index);
        this.methodName = stack.getMethodName(index);
        this.columnNumber = stack.getColumnNumber(index);
        this.context = stack.getContext(index);
        this.originFile = stack.getOrigin(index);
        this.shortPath = this.buildShortPath();
    }
    CallSite.prototype.findCallSiteIdx = function (stack) {
        var index;
        var self = this;
        var alreadyApi = false;
        stack.list.find(function (site, idx) {
            var isNativeMethod = self.isNativeMethod(site, idx);
            var currentHitsApi = self.isFromApiCall(site, idx);
            if (alreadyApi) {
                if (!currentHitsApi && !isNativeMethod) {
                    index = idx;
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                alreadyApi = currentHitsApi;
                return false;
            }
        });
        return index;
    };
    CallSite.prototype.getBrief = function () {
    };
    CallSite.prototype.getVerbose = function () {
    };
    CallSite.prototype.buildShortPath = function () {
        var fp = this.fileName;
        var pieces = fp.split('/');
        return u.arrLastX(pieces, 3).join('/');
    };
    CallSite.prototype.isFromApiCall = function (site, idx) {
        var fileName = site.getFileName(idx);
        return ((fileName.indexOf('api/params.js') > -1) ||
            (fileName.indexOf('api/ensure.js') > -1));
    };
    CallSite.prototype.isNativeMethod = function (site, idx) {
        return site.getFileName(idx).indexOf('native') > -1;
    };
    return CallSite;
})();
exports.CallSite = CallSite;
//# sourceMappingURL=CallSite.js.map