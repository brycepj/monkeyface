import {iDeclarationFactory} from '../interfaces/Factories';
import {iDeclaration} from '../interfaces/Models';
import {Declaration} from '../models/Declaration';

class DeclarationFactory {

  // TODO: Simple Declaration vs Complex Declaration    
  create(str: string, cfg?: any): any {
    var Bridge = require('../services/BridgeService');
    let strArr = str.split(':');
    let key = strArr[0];
    let hasType = strArr.length == 2;
    let declaredType = hasType ? strArr[1] : null;
    let iface;
    if (Bridge.Registry.check(declaredType)) {
      let ifaceKey = declaredType;
      iface = Bridge.Registry.get(ifaceKey);
      let hasInterface = cfg.options && cfg.options.hasInterface;
      // if the annotated interface matches the current declaration
      if (hasInterface && hasInterface.indexOf(key) > -1) {
        iface.setKey(key);
      }
    }
    // if string indicates interface, return the interface
    let val: iDeclaration = new Declaration(str, iface);
    return val;
  }
}

export = new DeclarationFactory();