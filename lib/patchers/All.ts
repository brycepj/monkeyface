import Config = require('../services/ConfigService');
import ensure = require('../api/ensure');
import Types = require('../services/Types');
import u = require('../services/utils');
import prod = require('./prod');

export = (function() {
  let natives = Types.allNatives();
  u.forEach(natives, (native) => {
    let method = Config.env === 'production' ? prod.ensure : ensure;
    u.methodPatcher(native, Config.ensureKey, method);
  });
})();




