var ensure = $require('api/ensure');
exports = (function () {
    Types.forEach(function (NativeClass) {
        NativeClass.prototype.ensure = ensure;
    });
})();
