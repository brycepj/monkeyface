"use strict";
var _ = require('lodash');
var u = require('./utils');
var ConfigService = (function () {
    function ConfigService() {
        this.defaults = defaults;
        this.props = _.assign({}, defaults);
    }
    ConfigService.prototype.setConfig = function (config) {
        _.assign(this.props, config);
    };
    ConfigService.prototype.resetDefaults = function (config) {
        this.props = config ? _.assign(this.props, defaults, config) : _.assign({}, defaults);
    };
    ConfigService.prototype.getConfig = function () {
        return this.props;
    };
    ConfigService.prototype.applyMiddleware = function (error) {
        var mw = this.props.exceptions.middleware;
        mw = typeof mw === 'function' ? [mw] : mw;
        return _.reduce(mw, function (sum, n) {
            return (n(sum) || u.returnError("Middleware functions must return the error object"));
        }, error);
    };
    ConfigService.prototype.applyHandler = function (error) {
        if (this.handler !== null) {
            this.handler(error);
        }
    };
    Object.defineProperty(ConfigService.prototype, "env", {
        get: function () {
            return this.props.env;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "ensureKey", {
        get: function () {
            return this.props.ensure.key;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "paramsKey", {
        get: function () {
            return this.props.params.key;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "paramsDivider", {
        get: function () {
            return this.props.params.divider;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "handler", {
        get: function () {
            return this.props.exceptions.handler;
        },
        set: function (fn) {
            this.props.exceptions.handler = fn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "action", {
        get: function () {
            return this.props.exceptions.action;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "middleware", {
        get: function () {
            return this.props.exceptions.middleware;
        },
        set: function (val) {
            this.props.exceptions.middleware = val;
        },
        enumerable: true,
        configurable: true
    });
    return ConfigService;
}());
var noop = function () { };
var defaults = {
    ensure: {
        key: '$ensure'
    },
    params: {
        key: '$params',
        divider: '$'
    },
    exceptions: {
        action: 'error',
        handler: null,
        middleware: null
    },
    env: process.env.NODE_ENV || 'development'
};
module.exports = new ConfigService();
//# sourceMappingURL=ConfigService.js.map