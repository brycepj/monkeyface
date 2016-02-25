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
	
	// This is where you left off.
	// You need to be able to accept an interface reference as an interface as well
	var iface = Interface.createInterface('superBadInterface', ['hello:string']);
	console.log(iface);
	var tester = {
		hello: 'world'
	};
	
	tester = tester.implement(iface);
	console.log('tester after implement', tester);
})();

function patchMethods(Class, methodsMap) {
	_.forIn(methodsMap, function(val, key){
		var name = key, method = val;
		Class.prototype[name] = val;
	});
}


