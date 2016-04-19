var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Config = require('../services/ConfigService');
var CallSite_1 = require('./CallSite');
var TypeCheckError = (function (_super) {
    __extends(TypeCheckError, _super);
    function TypeCheckError(type, val, stack) {
        _super.call(this);
        this.type = type;
        this.val = val;
        this.callSite = new CallSite_1.CallSite(stack);
        this.timestamp = new Date();
        this.action = Config.action;
        this.verbose = Config.verbose;
        this.msg = this.buildMsg();
    }
    TypeCheckError.prototype.buildMsg = function () {
        var callSite = this.callSite;
        var val = this.val;
        var type = this.type;
        var msgBase = 'MonkeyfaceError: Expected: ';
        return msgBase.concat(type, ' Received: ', val, ' (' + callSite.shortPath, ' ', callSite.lineNumber, ':', callSite.columnNumber, ')');
    };
    TypeCheckError.prototype.enact = function () {
        var action = this.action;
        var errStr = this.msg;
        switch (action) {
            case 'throw':
                throw errStr;
            case 'debug':
                console.log(errStr);
                break;
            case 'warn':
                console.warn(errStr);
                break;
            case 'error':
                console.error(errStr);
                break;
        }
        return '';
    };
    TypeCheckError.create = function (type, val, stack) {
        return new TypeCheckError(type, val, stack);
    };
    return TypeCheckError;
})(Error);
exports.TypeCheckError = TypeCheckError;
//# sourceMappingURL=TypeCheckError.js.map