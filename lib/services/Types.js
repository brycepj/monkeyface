var Types = [String, Array, Object, Number, Error, Boolean, Date];
var Names = ["string", "array", "object", "number", "error", "boolean", "date"];
var Instances = ["stringy", [], {}, 1, new Error("Message"), true, new Date()];
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
module.exports = {
    Types: Types,
    Names: Names,
    Instances: Instances,
    allNatives: allNatives,
    allNativesButOne: allNativesButOne,
};
//# sourceMappingURL=Types.js.map