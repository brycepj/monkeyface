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

  constructor(type: string, val: any, private stack: StackTrace) {
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
    let collIdxDetail = this.stack ? this.stack.detail.index : '';
    let valDetail = this.stack ? '(val=' + this.stack.detail.val + ')' : '';
    let typeDetail = this.stack ? this.stack.detail.type.key : '';
    let callSite = this.callSite;
    let type = this.type;
    let msgBase = 'MonkeyfaceError!';
    let idx = collIdxDetail ? '(idx: ' + collIdxDetail + ')' : undefined;
    let key = typeDetail ? '(key=' + typeDetail + ')' : undefined;
    let val = this.val;
    return maybeConcatStrings([msgBase,
      'Expected:', type, key, idx,
      'Received:', val, valDetail,
      callSite.shortPath + ':' + callSite.lineNumber + ':' + callSite.columnNumber
    ]);
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

export class DeclarationError extends Error {
  public type: any;
  public val: any;
  public index: any;
  constructor(type, val, idx?) {
    super();
    this.type = type;
    this.val = val;
    this.index = idx ? idx + '' : undefined;
  }
}

function maybeConcatStrings(arr) {
  return arr.reduce((sum, curr) => {
    let currStr = curr ? ' ' + curr : '';
    return sum + currStr;
  });
}