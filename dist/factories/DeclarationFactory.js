"use strict";
var Declaration_1 = require('../models/Declaration');
var DeclarationFactory = (function () {
    function DeclarationFactory() {
    }
    DeclarationFactory.prototype.create = function (str, cfg) {
        var Bridge = require('../services/BridgeService');
        var strArr = str.split(':');
        var key = strArr[0];
        var hasType = strArr.length == 2;
        var declaredType = hasType ? strArr[1] : null;
        var iface;
        if (Bridge.Registry.check(declaredType)) {
            var ifaceKey = declaredType;
            iface = Bridge.Registry.get(ifaceKey);
            var hasInterface = cfg.options.hasInterface;
            if (hasInterface && hasInterface.indexOf(key) > -1) {
                iface.setKey(key);
            }
        }
        var val = new Declaration_1.Declaration(str, iface);
        return val;
    };
    return DeclarationFactory;
}());
module.exports = new DeclarationFactory();
