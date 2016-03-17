const _ = require('lodash');
import check = require('../services/typeChecker');


import { iCreateInterfaceConfig, iCreateInterfaceOptionsPublic, 
  iCreateInterfaceOptions } from '../interfaces/Config';

function createInterface(arg1, arg2, arg3): iCreateInterfaceConfig {
  let hasName:boolean = typeof arg1 === 'string';
  let options:Object = hasName ? ( arg3 ? arg3 : {} ): ( arg2 ? arg2 : {} );
  let validOptions:iCreateInterfaceOptionsPublic = createInterfaceOptions(options);
  let rawConfig = {
    name: hasName ? arg1 : null,
    props: hasName ? arg2 : arg1,
    options: validOptions
  };
  
  return configPipeline(rawConfig, [addAnnotations]);
}

function configPipeline(cfg, pipes:Function[]) {
  let curr = cfg;
  // TODO: Add interface for pipes
  pipes.forEach(function(pipe:Function, idx) {
    curr = pipe(curr);    
  });
  return curr;
}

// validate public configurations
function createInterfaceOptions(options:Object):iCreateInterfaceOptionsPublic {
  var validKeys:string[] = ['noNulls', 'strict'];
  let validOptions = {};
  
  // re-set valid keys
  validKeys.forEach(function(validKey:string, idx){
    let validVal:boolean = !!options[validKey];
    if (options[validKey]){ validOptions[validKey] = validVal }; 
  });
  
  return validOptions;
}

function registerInterface(cfg) {
  return cfg;
}

// add other helpful (private) config props to options
function addAnnotations(cfg:iCreateInterfaceConfig):iCreateInterfaceConfig {
  let Bridge = require('../services/BridgeService');
  let annotatedOptions = _.assign(cfg.options, {
    hasTypes: listHasSubstr(cfg.props, ':'),
    hasModel: check.isObject(cfg.props),
    hasOptional: listHasSubstr(cfg.props, '?'),
    hasInterface: !!_.intersection(Bridge.Registry.listKeys(), cfg.props).length,
    hasCollection: listHasSubstr(cfg.props, '[]') || 
      (listHasSubstr(cfg.props, '[') && listHasSubstr(cfg.props, ']'))
  });
  return cfg;
}

function isSimple(options:iCreateInterfaceOptionsPublic):iCreateInterfaceOptionsPublic {

  return options;
}

function listHasSubstr(list: string[], substr:string):boolean {
  return !!list.find(function(item, idx){
    return item.indexOf(substr) > -1;
  });
}

function listHasStr(list: string[], str:string):boolean {
  return !!list.find(function(item, idx){
    return item === str;
  });
}


export = {
  createInterface: createInterface,
  registerInterface: registerInterface
};

