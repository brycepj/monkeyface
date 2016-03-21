var i = require('./index');

// i.create() is shorthand for create, register, and return the interface
var iHello = i.create('supabadinterface', ['hello:number', 'world:string']); // optional name

var crazyObj = {
  hello: 1,
  world: 'stringer'
};

var crazyObjReturner = (function (){
  return crazyObj.ensure('supabadinterface'); // returns obj, or throws error if it doesn't match
})();

if (crazyObjReturner !== crazyObj) {
  throw Error("BiG Error!");
} else {
  console.log("Made it! Passed!")
}