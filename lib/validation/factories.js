"use strict";
var _ = require('lodash');
var check = require('../services/typeChecker');
function createInterface(arg1, arg2, arg3) {
    var hasName = typeof arg1 === 'string';
    var options = hasName ? (arg3 ? arg3 : {}) : (arg2 ? arg2 : {});
    var validOptions = createInterfaceOptions(options);
    var rawConfig = {
        name: hasName ? arg1 : null,
        props: hasName ? arg2 : arg1,
        options: validOptions
    };
    return configPipeline(rawConfig, [addAnnotations]);
}
function configPipeline(cfg, pipes) {
    var curr = cfg;
    pipes.forEach(function (pipe, idx) {
        curr = pipe(curr);
    });
    return curr;
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
    return validOptions;
}
function registerInterface(cfg) {
    return cfg;
}
function addAnnotations(cfg) {
    var Bridge = require('../services/BridgeService');
    var annotatedOptions = _.assign(cfg.options, {
        hasTypes: listHasSubstr(cfg.props, ':'),
        hasModel: check.isObject(cfg.props),
        hasOptional: listHasSubstr(cfg.props, '?'),
        hasInterface: !!_.intersection(Bridge.Registry.listKeys(), cfg.props).length,
        hasCollection: listHasSubstr(cfg.props, '[]') ||
            (listHasSubstr(cfg.props, '[') && listHasSubstr(cfg.props, ']'))
    });
    return cfg;
}
function isSimple(options) {
    return options;
}
function listHasSubstr(list, substr) {
    return !!list.find(function (item, idx) {
        return item.indexOf(substr) > -1;
    });
}
function listHasStr(list, str) {
    return !!list.find(function (item, idx) {
        return item === str;
    });
}
module.exports = {
    createInterface: createInterface,
    registerInterface: registerInterface
};
//# sourceMappingURL=factories.js.map