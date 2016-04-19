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

  constructor() {
    this.setStack();
  }

  setStack() {
    this.list = __stack();
  }

  getLineNumber(idx) {
    return this.list[idx].getLineNumber();
  }

  getFunctionName(idx) {
    return this.list[idx].getFunctionName();
  }

  getFileName(idx) {
    return this.list[idx].getFileName();
  }

  getMethodName(idx) {
    return this.list[idx].getMethodName();
  }

  getColumnNumber(idx) {
    return this.list[idx].getColumnNumber();
  }

  getContext(idx) {
    return this.list[idx].getThis();
  }

  getOrigin(idx) {
    return this.list[idx].getEvalOrigin();
  }
}

