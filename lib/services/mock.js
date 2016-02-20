function noop(){}

function MockInterfaceConfigClass() {
  this.stringProp = 'stringery';
  this.numberProp = 1;
  this.objectProp = {};
  this.arrayProp = [];
  this.nullProp = null;
  this.functionProp = noop;
}

MockInterfaceConfigClass.prototype.mockMethod = noop;


module.exports = {
  Obj: new MockInterfaceConfigClass()
}