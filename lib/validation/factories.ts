import { 
  iCreateInterfaceConfig, 
  iCreateInterfaceOptionsPublic, 
  iCreateInterfaceOptions 
} from '../interfaces/Config';

function createInterface(args): iCreateInterfaceConfig {
  let hasName:boolean = typeof args[0] === 'string';
  let options:Object = hasName ? 
    ( args[2] ? args[2] : {} ): 
    ( args[1] ? args[1] : {} );
  let validOptions:iCreateInterfaceOptionsPublic = createInterfaceOptions(options);
  
  return {
    name: hasName ? args[0] : null,
    props: hasName ? args[1] : args[0],
    options: validOptions
  };
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
  
  addPrivateOptions(validOptions);

  return validOptions;
}

function registerInterface(cfg) {
  return cfg;
}

// add other helpful (private) config props to options
function addPrivateOptions(options:iCreateInterfaceOptionsPublic):iCreateInterfaceOptions {
  let privateOptions = options;
  var fns = [isSimple];
  return privateOptions;
}

function isSimple(options:iCreateInterfaceOptionsPublic) {
  
}
export = {
  createInterface: createInterface,
  registerInterface: registerInterface
};