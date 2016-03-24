function maybeThrow(Bool, type, self) {
  let err_action = 'throw';
  if (!Bool) {
    if (err_action === 'throw') {
      throw new Error("Monkeyface TypeError. Expected: " + type + ' Received: ' + self);
    } else {
      console.warn("Monkeyface TypeError. Expected:", type);
    }
  } else if (err_action == 'warn') {
    console.log("Expected type: ", type, "Passed");
  }
}

export = maybeThrow;