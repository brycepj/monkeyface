const ensure = $require('api/ensure');

var Types = [String, Array, Object, Number, Error, Boolean, Date];

exports = (function() {
	Types.forEach(function(NativeClass){
	  NativeClass.prototype.ensure = ensure;
	});
})();




