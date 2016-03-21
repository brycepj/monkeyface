var i = require('./index');

// i.create() is shorthand for create, register, and return the interface
var iHello = i.create(['hello', 'world']); // optional name

var crazyObj = {
  hello: null,
  world: null
};


crazyObj = {
  dello: null,
  world: null
};

var crazyObjReturner = (function (){
  return iHello.validate(crazyObj); // returns obj, or throws error if it doesn't match
})();

if (crazyObjReturner !== crazyObj) {
  throw Error("BiG Error!");
}