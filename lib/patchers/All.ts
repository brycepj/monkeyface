import ensure = require('../api/ensure');
import Types = require('../services/Types');



// TODO: Write a nice service for this and mocks
export = (function() {
  let natives = Types.allNatives();
	natives.forEach(function(native:any){
    native.prototype['ensure'] = ensure;
	});
})();




