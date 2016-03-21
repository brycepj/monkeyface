var i = require('./index');
var _OBJ = require('lodash');

// i.create() is shorthand for create, register, and return the interface
var iLodash = i.create('iLodash', _OBJ); // optional name

var crazyObj = {
  hello: 1,
  world: 'stringer'
};

var crazyVal = _OBJ;

var crazyValReturner = (function (){
  return crazyVal.ensure('iLodash'); // returns obj, or throws error if it doesn't match
})();

if (crazyValReturner !== crazyVal) {
  throw Error("BiG Error!");
} else {
  console.log("Made it! Passed!")
}