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

function crazyObjReturner(){
  return iHello.ensure(crazyObj); // returns obj, or throws error if it doesn't match
}

if (crazyObjReturner() !== crazyObj) {
  throw Error("Bitches ain't shit!");
}