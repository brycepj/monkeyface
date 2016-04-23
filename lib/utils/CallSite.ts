import u = require('../services/utils');

export class CallSite {
  public functionName: string;
  public lineNumber: string;
  public fileName: string;
  public methodName: string;
  public columnNumber: string;
  public context: string;
  public originFile: string;
  public shortPath: string;

  constructor(stack) {
    let index = this.findCallSiteIdx(stack);
    this.functionName = stack.getFunctionName(index);
    this.lineNumber = stack.getLineNumber(index);
    this.fileName = stack.getFileName(index);
    this.methodName = stack.getMethodName(index);
    this.columnNumber = stack.getColumnNumber(index);
    this.context = stack.getContext(index);
    this.originFile = stack.getOrigin(index);
    this.shortPath = this.buildShortPath();
  }

  findCallSiteIdx(stack) {
    var index;
    var self = this;
    var alreadyApi = false;
    stack.list.find((site, idx) => {
      let isNativeMethod = self.isNativeMethod(site, idx);
      let currentHitsApi = self.isFromApiCall(site, idx);
      if (alreadyApi) {
        if (!currentHitsApi && !isNativeMethod) {
          index = idx;
          return true;
        } else {
          return false;
        }
      } else {
        alreadyApi = currentHitsApi;
        return false;
      }
    });
    return index;
  }

  getBrief() {

  }
  getVerbose() {

  }

  private buildShortPath() {
    let fp = this.fileName;
    let pieces = fp.split('/');
    return u.arrLastX(pieces, 1).join('/');
  }

  // FIXME: Support optional indexes being passed to StackTrace
  private isFromApiCall(site, idx) {
    let fileName = site.getFileName(idx);

    return ((fileName.indexOf('api/params.js') > -1) ||
      (fileName.indexOf('api/ensure.js') > -1));
  }
  private isNativeMethod(site, idx) {
    return site.getFileName(idx).indexOf('native') > -1;

  }
}