"use strict";
function maybeThrow(Bool, type, self) {
    if (!Bool) {
        if (err_action === 'throw') {
            throw new Error("Monkeyface TypeError. Expected: " + type);
        }
        else {
            console.warn("Monkeyface TypeError. Expected:", type);
        }
    }
    else if (err_action == 'warn') {
        console.log("Expected type: ", type, "Passed");
    }
}
module.exports = maybeThrow;
//# sourceMappingURL=maybeThrow.js.map