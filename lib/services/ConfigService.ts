import _ = require('lodash');

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
    return _.reduce(this.middleware, function(sum: any, n: Function) {
      return n(sum);
    }, error);
  }

  applyHandler(err): void {
    if (this.handler !== null) {
      this.handler(err);
    }
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
  get handler() {
    return this.props.exceptions.handler;
  }
  get action() {
    return this.props.exceptions.action;
  }
  get middleware() {
    return this.props.exceptions.middleware;
  }
}

var noop = () => { };
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
  }
};
export = new ConfigService();

interface iConfigProps {
  ensure: {
    key?: string;
  };
  params: {
    key?: string;
    divider?: string;
  };
  exceptions: {
    action: string;
    handler: (err?) => {};
    middleware: any;
  }
} 
