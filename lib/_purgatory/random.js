function patchMethods(Class, methodsMap) {
    _.forIn(methodsMap, function (val, key) {
        var name = key, method = val;
        Class["prototype"][name] = method;
    });
}
