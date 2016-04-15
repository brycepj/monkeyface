import Config = require('../services/ConfigService');
import ensure = require('../api/ensure');
import Types = require('../services/Types');
import _ = require('lodash');
import u = require('../services/utils');

export = (function() {
  let natives = Types.allNatives();
  u.forEach(natives, (native) => {
    u.methodPatcher(native, Config.ensureKey, ensure);
  });
})();




