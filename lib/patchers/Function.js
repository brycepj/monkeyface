module.exports = (function() {
	Function.prototype.ensureParams = $require('api/ensureParams');
	
	
var newVal = functionWithSomeParams.ensureParams('stringting', 111, ['arrayArg']);

function functionWithSomeParams (arg1__string, arg2__number, arg3__array) {
   console.log("Hello this is the function with the params", arg1__string, arg2__number, arg3__array);
}

})();

