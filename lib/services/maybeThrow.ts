import {TypeCheckError} from '../utils/TypeCheckError';
import Config = require('./ConfigService');
import {StackTrace} from '../utils/StackTrace';

function maybeThrow(Bool, type, val, stack) {
  
  if (!Bool) {
    let stack = new StackTrace();
    let typeError = TypeCheckError.create(type, val, stack);

    var reducedError = Config.middleware ? Config.applyMiddleware(typeError) : typeError;

    if (Config.handler) {
      Config.applyHandler(typeError);
    }
    let errJson = JSON.stringify(typeError, null, 2);
    
    typeError.enact();
  }
  return true;
}

export = maybeThrow;