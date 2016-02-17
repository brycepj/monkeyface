var is = require('./lib/is');
var arrHas = require('./lib/has');
var Interface = require('./lib/models/Interface');

String.prototype.is = is;
Array.prototype.is = is;
Object.prototype.is = is;
Number.prototype.is = is;
Error.prototype.is = is;
Array.prototype.hasOnly = arrHas;
Function.prototype.params = params;


function main () {
  var newStr = 'heelloo world'.is('string');
  var newArr = ['hello', 'world'].is('array');
  var newObj = { key: 'val'}.is('object');
  var newNum = 20; newNum.is('number');
  var newErr = new Error().is('error');
  var arrHas = ['hello', 'worlds'].hasOnly('string');
}

main();

function params(){
  var fn = this;
   var fnStr = fn.toString();

   // parse argument refs
   var paramsStrArr = getParamNames(fn);

/* TODO: YOU LEFT OFF HERE */
   var pairings = paramsStrArr.map(function(param, index){
      param = param.split('__').length > 1 ? param.split('__')[1] : param.split('__')[0];
      return {
        type: param.split('__')[1],
        val:
      }
   });

   return this.apply(null, arguments);
};



var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;
  
function getParamNames(func) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if(result === null)
     result = [];
  return result;
}


var newVal = functionWithSomeParams.params('stringArg', 123, ['arrayArg']);

function functionWithSomeParams (arg1__string, arg2__number, arg3__array) {
   console.log("Hello this is the function with the params", arg1__string, arg2__number, arg3__array);
}



/*

Tests to write: 

All.is
  - test that the value is returned
  - or an error is thrown if the wrong value is passed
  - figure out how to wrap the error object, to determine if 
    value is null, undefined and/if that is expected
Arr.hasOnly
Obj.hasOnly
Number.equals
String.contains
Function.params (this is a biggie)
  - ensure that params being passed match params set
*/
