function noop(){}

function MockInterfaceConfigClass() {
  this.stringProp = 'stringery';
  this.numberProp = 1;
  this.objectProp = {};
  this.arrayProp = [];
	this.nullType = null;
  this.functionProp = noop;
	this.errorProp = new Error();
}

MockInterfaceConfigClass.prototype.mockMethod = noop;


module.exports = {
  Obj: new MockInterfaceConfigClass()
}