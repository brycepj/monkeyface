import Config = require('./ConfigService');

function maybeThrow(Bool, type, val) {
  let action = Config.action || 'error';
  let error = {
    action: action,
    timestamp: new Date(),
    message: 'Monkeyface Type Error! Expected: ' + type + ' Received: ' + val,
    type: type,
    value: val
  };
  
  var reducedError = Config.middleware ? Config.applyMiddleware(error) : error;

  if (Config.handler) {
    Config.applyHandler(reducedError);
  }
  
  if (!Bool) {
    switch (action) {
      case 'error':
        throw new Error(JSON.stringify(error, null, 2));
      case 'warn':
        console.warn(error);
        break;
      case 'log':
        console.log(error);
        break;
    }
  }
  return true;
}

export = maybeThrow;