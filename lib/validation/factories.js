"use strict";
function createInterface(args) {
    var hasName = typeof args[0] === 'string';
    var options = hasName ?
        (args[2] ? args[2] : {}) :
        (args[1] ? args[1] : {});
    var validOptions = createInterfaceOptions(options);
    return {
        name: hasName ? args[0] : null,
        props: hasName ? args[1] : args[0],
        options: validOptions
    };
}
function createInterfaceOptions(options) {
    var validKeys = ['noNulls', 'strict'];
    var validOptions = {};
    validKeys.forEach(function (validKey, idx) {
        var validVal = !!options[validKey];
        if (options[validKey]) {
            validOptions[validKey] = validVal;
        }
        ;
    });
    addPrivateOptions(validOptions);
    return validOptions;
}
function registerInterface(cfg) {
    return cfg;
}
function addPrivateOptions(options) {
    var privateOptions = options;
    var fns = [isSimple];
    return privateOptions;
}
function isSimple(options) {
}
module.exports = {
    createInterface: createInterface,
    registerInterface: registerInterface
};
//# sourceMappingURL=factories.js.map