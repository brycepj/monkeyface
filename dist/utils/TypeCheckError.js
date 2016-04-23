"use strict";
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
        this.stack = stack;
        this.type = type;
        this.val = val;
        this.callSite = new CallSite_1.CallSite(stack);
        this.timestamp = new Date();
        this.action = Config.action;
        this.verbose = Config.verbose;
        this.msg = this.buildMsg();
    }
    TypeCheckError.prototype.buildMsg = function () {
        var collIdxDetail = this.stack ? this.stack.detail.index : '';
        var valDetail = this.stack ? '(val=' + this.stack.detail.val + ')' : '';
        var typeDetail = this.stack ? this.stack.detail.type.key : '';
        var callSite = this.callSite;
        var type = this.type;
        var msgBase = 'MonkeyfaceError!';
        var idx = collIdxDetail ? '(idx: ' + collIdxDetail + ')' : undefined;
        var key = typeDetail ? '(key=' + typeDetail + ')' : undefined;
        var val = this.val;
        return maybeConcatStrings([msgBase,
            'Expected:', type, key, idx,
            'Received:', val, valDetail,
            callSite.shortPath + ':' + callSite.lineNumber + ':' + callSite.columnNumber
        ]);
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
}(Error));
exports.TypeCheckError = TypeCheckError;
var DeclarationError = (function (_super) {
    __extends(DeclarationError, _super);
    function DeclarationError(type, val, idx) {
        _super.call(this);
        this.type = type;
        this.val = val;
        this.index = idx ? idx + '' : undefined;
    }
    return DeclarationError;
}(Error));
exports.DeclarationError = DeclarationError;
function maybeConcatStrings(arr) {
    return arr.reduce(function (sum, curr) {
        var currStr = curr ? ' ' + curr : '';
        return sum + currStr;
    });
}
