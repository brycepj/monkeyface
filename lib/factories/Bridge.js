var validation = $require('validation/factories');
var Bridge = (function () {
    $require('patchers/index');
    function _Bridge() {
        this.Registry = $require('factories/Registry');
        this.Interface = $require('factories/Interface');
        this.Declaration = $require('factories/Declaration');
    }
    _Bridge.prototype.createInterface = function () {
        var v = validation.createInterface;
        var i = this.Interface.create(name, v(arguments));
        return this.Registry.create(i);
    };
    _Bridge.prototype.registerInterface = function (name, cfg) {
        var v = validation.registerInterface;
        var i = this.Interface.create(name, v(cfg));
        this.Registry.register(i);
    };
    return new _Bridge();
})();
var bridge = new Bridge();
exports = bridge;
