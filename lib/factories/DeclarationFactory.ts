import {iDeclarationFactory} from '../interfaces/Factories';
import {iDeclaration} from '../interfaces/Models';
import {Declaration} from '../models/Declaration';

var check = require('../services/typeChecker');

class DeclarationFactory implements iDeclarationFactory {

  // TODO: Simple Declaration vs Complex Declaration    
  create() {
    let val: iDeclaration = new Declaration("Hello Config String");
    return val;
  }

  validate(val:any, type:string) {
    // TODO: Simple Declaration vs Complex Declaration    
    return true;
  }
}

exports = new DeclarationFactory();