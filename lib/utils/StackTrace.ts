declare var __stack: any;
declare var global: any;
declare var Error: any;

global['__stack'] = function() {
  var orig = Error.prepareStackTrace;
  Error.prepareStackTrace = function(_, stack) { return stack; };
  var err = new Error;
  Error.captureStackTrace(err, arguments.callee);
  var stack = err.stack;
  Error.prepareStackTrace = orig;
  return stack;
};

export class StackTrace {
  public list;
  public getOrigin: Function;
  public getLineNumber: Function;
  public getFunctionName: Function;
  public getFileName: Function;
  public getMethodName: Function;
  public getColumnNumber: Function;
  public getContext: Function;

  constructor() {
    this.setStack();
    let flexibleWrap = this.flexibleCallsiteWrapper;
    this.getOrigin = flexibleWrap('getEvalOrigin');
    this.getLineNumber = flexibleWrap('getLineNumber');
    this.getFunctionName = flexibleWrap('getFunctionName');
    this.getFileName = flexibleWrap('getFileName');
    this.getMethodName = flexibleWrap('getMethodName');
    this.getColumnNumber = flexibleWrap('getColumnNumber');
    this.getContext = flexibleWrap('getThis');
  }

  setStack() {
    this.list = __stack();
  }

  private flexibleCallsiteWrapper(method: string) {
    return function(idx: any, site?) {
      return site ? site[method]() : this.list[idx][method]();
    };
  }
}

