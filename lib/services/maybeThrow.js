var TypeCheckError_1 = require('../utils/TypeCheckError');
var Config = require('./ConfigService');
var StackTrace_1 = require('../utils/StackTrace');
function maybeThrow(Bool, type, val, stack) {
    if (!Bool) {
        var stack_1 = new StackTrace_1.StackTrace();
        var typeError = TypeCheckError_1.TypeCheckError.create(type, val, stack_1);
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
//# sourceMappingURL=maybeThrow.js.map