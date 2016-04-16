const _ = require('lodash');
import check = require('../services/typeChecker');


import { iCreateInterfaceConfig, iCreateInterfaceOptionsPublic,
iCreateInterfaceOptions } from '../interfaces/Config';

function createInterface(arg1?, arg2?, arg3?): iCreateInterfaceConfig {
  let hasName: boolean = typeof arg1 === 'string';
  let options: Object = hasName ? (arg3 ? arg3 : {}) : (arg2 ? arg2 : {});
  let validOptions: iCreateInterfaceOptionsPublic = createInterfaceOptions(options);
  let rawConfig = {
    name: hasName ? arg1 : null,
    props: hasName ? arg2 : arg1,
    options: validOptions
  };

  return configPipeline(rawConfig, []);
}

function configPipeline(cfg, pipes: Function[]) {
  let curr = cfg;
  // TODO: Add interface for pipes
  pipes.forEach(function(pipe: Function, idx) {
    curr = pipe(curr);
  });
  return curr;
}

// validate public configurations
function createInterfaceOptions(options: Object): iCreateInterfaceOptionsPublic {
  var validKeys: string[] = ['noNulls', 'strict'];
  let validOptions = {};
  
  // re-set valid keys
  validKeys.forEach(function(validKey: string, idx) {
    let validVal: boolean = !!options[validKey];
    if (options[validKey]) { validOptions[validKey] = validVal };
  });

  return validOptions;
}

function registerInterface(name: string, cfg) {
  return createInterface(name, cfg);
}

// add other helpful (private) config props to options
/*function addAnnotations(cfg: iCreateInterfaceConfig): iCreateInterfaceConfig {
  let Bridge = require('../services/BridgeService');
  let props = cfg.props;
  let options = cfg.options;

  let annotatedOptions = _.assign(options, {
    isCollection: check.isString(props) && props.indexOf('[]') > -1,
    isInferred: check.isObject(props),
    hasInterface: props.map(function(prop){
      let pieces = prop.split(':');
      let type = pieces.length == 2 ? pieces[1] : null;
      let key = pieces[0];
      return Bridge.Registry.check(type) ? key : null;
    }).filter(function(val){return val});
    // hasTypes: listHasSubstr(props, ':'),
    // hasModel: check.isObject(props),
    // hasOptional: listHasSubstr(props, '?'),
    // hasInterface: !!_.intersection(Bridge.Registry.listKeys(), props).length,
    // hasCollection: listHasSubstr(props, '[]') || 
    //   (listHasSubstr(props, '[') && listHasSubstr(props, ']'))
  });
  return cfg;
}*/

function isSimple(options: iCreateInterfaceOptionsPublic): iCreateInterfaceOptionsPublic {

  return options;
}

function listHasSubstr(list: string[], substr: string): boolean {
  return !!list.find(function(item, idx) {
    return item.indexOf(substr) > -1;
  });
}

function listHasStr(list: string[], str: string): boolean {
  return !!list.find(function(item, idx) {
    return item === str;
  });
}


export = {
  createInterface: createInterface,
  registerInterface: registerInterface
};

