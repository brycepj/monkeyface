"use strict";
var Types = [String, Array, Object, Number, Error, Boolean, Date];
var Instances = ["stringy", [], {}, 1, new Error("Message"), new Boolean(true), new Date()];
function allNatives(detail) {
    return !detail ? Types : Types.map(function (nativeClass) {
        return { name: String(nativeClass), native: nativeClass };
    });
}
function allNativesButOne(native) {
    var natives = allNatives();
    return natives.filter(function (val, idx) {
        return val !== native;
    });
}
function allInstances(detail) {
    return !detail ? Instances : Instances.map(function (instance, idx) {
        return { name: instance, type: instance.__proto__, value: instance };
    });
}
function allInstancesButOne(native) {
    return allInstances().filter(function (val, idx) {
        return val !== native;
    });
}
;
module.exports = {
    allNatives: allNatives,
    allNativesButOne: allNativesButOne,
    allInstances: allInstances,
    allInstancesButOne: allInstancesButOne
};
//# sourceMappingURL=Types.js.map