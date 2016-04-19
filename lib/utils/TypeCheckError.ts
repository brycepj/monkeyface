import Config = require('../services/ConfigService');
import {StackTrace} from './StackTrace';
import {CallSite} from './CallSite';

export class TypeCheckError extends Error {

  private msg: string;
  private action: string;
  private timestamp: Date;
  private verbose: boolean;
  private type: string;
  private val: any;
  private callSite: any;

  constructor(type: string, val: any, stack: StackTrace) {
    super();
    this.type = type;
    this.val = val;
    this.callSite = new CallSite(stack);
    this.timestamp = new Date();
    this.action = Config.action;
    this.verbose = Config.verbose;
    this.msg = this.buildMsg();
  }


  buildMsg() {
    let callSite = this.callSite;
    let val = this.val;
    let type = this.type;
    let msgBase = 'MonkeyfaceError: Expected: ';
    return msgBase.concat(type, 
    ' Received: ', val, 
    ' (' + callSite.shortPath,' ', callSite.lineNumber, 
    ':', callSite.columnNumber, ')');
  }

  enact() {
    let action = this.action;
    let errStr = this.msg;
    switch (action) {
      case 'throw':
        throw errStr;
      case 'debug':
        console.log(errStr);
        break;
      case 'warn':
        console.warn(errStr);
        break;
      case 'error':
        console.error(errStr);
        break;
    }
    return '';
  }

  static create(type, val, stack) {
    return new TypeCheckError(type, val, stack);
  }
}
