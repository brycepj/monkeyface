var _ = $require('services/utils');
var Interface = $require('services/InterfaceFactory');
var implement = $require('api/implement');
var env = $require('services/env');
var Types = [ String, Array, Object, Number, Error, Boolean, Date];

var Methods = {
	implement: implement
};

module.exports = (function() {

	Types.forEach(function(NativeClass, key){
		patchMethods(NativeClass, Methods);
	});
	
})();

function patchMethods(Class, methodsMap) {
	_.forIn(methodsMap, function(val, key){
		var name = key, method = val;
		Class["prototype"][name] = method;
	});
}


