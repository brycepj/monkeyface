import _ = require('lodash');

class ConfigService {
  private props:iConfigProps;
  constructor(props = {}) {
    _.assign(this.props, defaults);
  }
  
  setConfig(config){
    _.assign(this.props, config);
  }
  
  getConfig() {
    return this.props;
  }
  
  applyMiddleware(error):any{
    return _.reduce(this.middleware, function(sum:any, n:Function) {
      return n(sum);
    }, error);
  }
  
  applyHandler(err):void {
    if (this.handler !== null) {
      this.handler(err);
    }
  }
  get ensureKey(){
    return this.props.ensureKey;
  }
  get paramsKey(){
    return this.props.paramsKey;
  }
  get handler(){
    return this.props.exceptions.handler;
  }
  get action(){
    return this.props.exceptions.action;
  }
  get middleware(){
    return this.props.exceptions.middleware;
  }
}

var noop = () => {};
var defaults = {
    ensureKey: '$ensure',
    paramsKey: '$params',
    exceptions: {
      action: 'error',
      handler: null,
      middleware: null
    }
  };
export = new ConfigService();

declare interface iConfigProps {
   ensureKey: string;
    paramsKey: string;
    exceptions: {
      action: string;
      handler: (err?) => {};
      middleware: any;
    }
} 
