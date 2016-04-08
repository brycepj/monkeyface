import Config = require('../services/ConfigService');
import ensure = require('../api/ensure');
import Types = require('../services/Types');
import _ = require('lodash');

export = (function() {
  let natives = Types.allNatives();
  _.forEach(natives, (native) => {
    native.prototype[Config.ensureKey] = ensure;
  });
})();




