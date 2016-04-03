function maybeThrow(Bool, type, val) {
  let action = 'error';
  let message = 'Monkeyface TypeError. Expected: ' + type + ' Received: ' + val;

  if (!Bool) {
    switch (action) {
      case 'error':
        throw new Error(message);
      case 'warn':
        console.warn(message);
        break;
      case 'debug':
        console.log(message);
        break;
    }
  }
  return true;
}

export = maybeThrow;