import {iDeclarationFactory} from '../interfaces/Factories';
import {iDeclaration} from '../interfaces/Models';
import {Declaration} from '../models/Declaration';
import check = require('../services/typeChecker');

class DeclarationFactory implements iDeclarationFactory {

  // TODO: Simple Declaration vs Complex Declaration    
  create(str:string, cfg?: any):any {
    var Bridge = require('../services/BridgeService');
    let strArr = str.split(':');
    let key = strArr[0];
    let hasType = strArr.length == 2;
    let declaredType = hasType ? strArr[1] : null;

    if (check.isInterface(declaredType)) {
      let ifaceKey = declaredType;
      let iface = Bridge.Registry.get(ifaceKey);
      let hasInterface = cfg.options.hasInterface;
      // if the annotated interface matches the current declaration
      if (hasInterface && hasInterface.indexOf(key) > -1) {
        iface.setKey(key);
      }
      return iface;
    }
    // if string indicates interface, return the interface
    let val: iDeclaration = new Declaration(str);
    return val;
  }

  validate(val: any, type: string) {
    // TODO: Simple Declaration vs Complex Declaration    
    return true;
  }
}

export = new DeclarationFactory();