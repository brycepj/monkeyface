var err_action = $require('services/env').err_action;

function maybeThrow(Bool, type, self){
  if (!Bool){
    if (err_action === 'throw'){
      throw new Error("Monkeyface TypeError. Expected: " + type);
    } else {
      console.warn("Monkeyface TypeError. Expected:", type);
    }
  } else if(err_action == 'warn') {
    console.log("Expected type: ", type, "Passed");
  }
}

module.exports = maybeThrow;