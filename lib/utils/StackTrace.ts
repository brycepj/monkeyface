declare var __stack: any;
declare var global: any;
declare var Error: any;

global['__stack'] = function stackTraceGetter() {
  var callee = stackTraceGetter;
  var orig = Error.prepareStackTrace;
  Error.prepareStackTrace = function(_, stack) { return stack; };
  var err = new Error;
  Error.captureStackTrace(err, callee);
  var stack = err.stack;
  Error.prepareStackTrace = orig;
  return stack;
};

export class StackTrace {
  public list;

  constructor() {
    this.list = __stack();
  }

  getOrigin(idx?, site?) {
    return this.flexibleCallsiteWrapper('getEvalOrigin', idx, site);
  }
  getLineNumber(idx?, site?) {
    return this.flexibleCallsiteWrapper('getLineNumber', idx, site);
  }
  getFunctionName(idx?, site?) {
    return this.flexibleCallsiteWrapper('getFunctionName', idx, site);
  }
  getFileName(idx?, site?) {
    return this.flexibleCallsiteWrapper('getFileName', idx, site);
  }
  getMethodName(idx?, site?) {
    return this.flexibleCallsiteWrapper('getMethodName', idx, site);
  }
  getColumnNumber(idx?, site?) {
    return this.flexibleCallsiteWrapper('getColumnNumber', idx, site);
  }
  getContext(idx?, site?) {
    return this.flexibleCallsiteWrapper('getThis', idx, site);
  }
  private flexibleCallsiteWrapper(method: string, idx, site) {
    return site ? site[method]() : this.list[idx][method]();
  };

}

