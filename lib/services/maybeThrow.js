var err_action = $require('services/env').err_action;

function maybeThrow(Bool, type, self){
  if (!Bool){
    if (err_action === 'throw'){
      throw Error("Monkeyface TypeError. Expected: " + type);
    } else {
      console.warn("Monkeyface TypeError. Expected:", type, self);
    }
  } else if(err_action == 'warn') {
    console.log("Expected type: ", type, "Passed", self);
  }
}

module.exports = maybeThrow;