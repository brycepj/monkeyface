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
    this.getOrigin = this.flexibleCallsiteWrapper('getEvalOrigin');
    this.getLineNumber = this.flexibleCallsiteWrapper('getLineNumber');
    this.getFunctionName = this.flexibleCallsiteWrapper('getFunctionName');
    this.getFileName = this.flexibleCallsiteWrapper('getFileName');
    this.getMethodName = this.flexibleCallsiteWrapper('getMethodName');
    this.getColumnNumber = this.flexibleCallsiteWrapper('getColumnNumber');
    this.getContext = this.flexibleCallsiteWrapper('getThis');
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

