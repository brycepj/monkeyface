var u = require('./utils');
// FIXME: This shoudl be in tests. It isn't useful in library code.
function noop(){}

function MockInterfaceConfigClass() {
  this.stringProp = 'stringery';
  this.numberProp = 1;
  this.objectProp = {};
  this.arrayProp = [];
  this.functionProp = noop;
	this.errorProp = new Error();
	this.booleanProp = false;
	this.dateProp = new Date();
}

MockInterfaceConfigClass.prototype.mockMethod = noop;

var mockTypesArr = u.mapObj(new MockInterfaceConfigClass(), function(val, key){
	return val;
});

module.exports = {
  Obj: new MockInterfaceConfigClass(),
	Arr: mockTypesArr
}