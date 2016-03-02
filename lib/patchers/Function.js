var Interface = $require('services/InterfaceFactory');

module.exports = (function() {
	Function.prototype.ensureParams = $require('api/ensureParams');
})();

/*

functionWithSomeParams.ensureParams({super:'stringa'}, 111, [])

function functionWithSomeParams (arg1__supermutha, arg2__number, arg3__array) {
   console.log("Hello this is the function with the params", 
   arg1__supermutha, arg2__number, arg3__array);
}


*/