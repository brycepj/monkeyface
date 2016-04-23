"use strict";
var TypeCheckError_1 = require('../utils/TypeCheckError');
var Config = require('./ConfigService');
function maybeThrow(Bool, type, val, stack) {
    if (!Bool) {
        var typeError = TypeCheckError_1.TypeCheckError.create(type, val, stack);
        var reducedError = Config.middleware ? Config.applyMiddleware(typeError) : typeError;
        if (Config.handler) {
            Config.applyHandler(typeError);
        }
        var errJson = JSON.stringify(typeError, null, 2);
        typeError.enact();
    }
    return true;
}
module.exports = maybeThrow;
