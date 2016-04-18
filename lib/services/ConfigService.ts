import _ = require('lodash');
import u = require('./utils');

class ConfigService {
  private props: any;
  private defaults: any;
  
  constructor() {
    this.defaults = defaults;
    this.props = _.assign({}, defaults);
  }

  setConfig(config) {
    _.assign(this.props, config);
  }

  resetDefaults(config?) {
    this.props = config ? _.assign(this.props, defaults, config) : _.assign({}, defaults);
  }

  getConfig() {
    return this.props;
  }

  applyMiddleware(error): any {
    let mw = this.props.exceptions.middleware;
    mw = typeof mw === 'function' ? [mw] : mw;
    return _.reduce(mw, function(sum: any, n: Function) {
      return (n(sum) || u.returnError("Middleware functions must return the error object"));
    }, error);
  }

  applyHandler(error): void {
    if (this.handler !== null) {
      this.handler(error);
    }
  }
  
  get env() {
    return this.props.env;
  }
  get ensureKey() {
    return this.props.ensure.key;
  }
  get paramsKey() {
    return this.props.params.key;
  }
  get paramsDivider() {
    return this.props.params.divider;
  }
  set handler(fn) {
    this.props.exceptions.handler = fn;
  }
  get handler() {
    return this.props.exceptions.handler;
  }
  get action() {
    return this.props.exceptions.action;
  }
  // backdoor for testing
  set middleware(val: any) { // should be function or function[]
    this.props.exceptions.middleware = val;
  }
  get middleware() {
    return this.props.exceptions.middleware;
  }

}

var noop = () => {};
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
export = new ConfigService();

interface iConfigProps {
  ensure?: {
    key?: string;
  };
  params?: {
    key?: string;
    divider?: string;
  };
  exceptions?: {
    action?: string;
    handler?: (err?) => {};
    middleware?: any;
  };
  env: string;
} 
