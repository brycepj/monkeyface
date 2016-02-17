
function params(){
  var fn = this;
   var fnStr = fn.toString();

   // parse argument refs
   var paramsStrArr = getParamNames(fn);
   // decide on the API here -- this is missing a lot
   paramsStrArr.forEach(function(param, index){
    var pieces = param.split('__');
    var type = pieces.length == 2 ? pieces[1] : pieces[0];
    var val = arguments[index];
    val.is(type);
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

module.exports = params;