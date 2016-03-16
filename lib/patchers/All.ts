const ensure = $require('api/ensure');


// TODO: Write a nice service for this and mocks
exports = (function() {
	Types.forEach(function(NativeClass){
	  NativeClass.prototype.ensure = ensure;
	});
})();




