"use strict";
module.exports = (function () {
    if (!String.prototype.includes) {
        String.prototype.includes = function (search, start) {
            if (typeof start !== 'number') {
                start = 0;
            }
            if (start + search.length > this.length) {
                return false;
            }
            else {
                return this.indexOf(search, start) !== -1;
            }
        };
    }
})();
//# sourceMappingURL=jsPolyfills.js.map