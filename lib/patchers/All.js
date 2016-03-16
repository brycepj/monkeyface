"use strict";
var ensure = require('../api/ensure');
var Types = require('../services/Types');
module.exports = (function () {
    var natives = Types.allNatives();
    natives.forEach(function (native) {
        native.prototype.ensure = ensure;
    });
})();
//# sourceMappingURL=All.js.map