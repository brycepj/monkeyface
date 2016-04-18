"use strict";
var RegistryService = (function () {
    function RegistryService() {
        this.map = {};
    }
    RegistryService.prototype.create = function (iface) {
        this.map[iface.name] = iface;
    };
    ;
    RegistryService.prototype.register = function (iface) {
        this.map[iface.name] = iface;
    };
    ;
    RegistryService.prototype.check = function (key) {
        return !!this.map[key];
    };
    RegistryService.prototype.get = function (key) {
        return this.map[key];
    };
    RegistryService.prototype.listKeys = function () {
        return Object.keys(this.map);
    };
    return RegistryService;
}());
module.exports = new RegistryService();
