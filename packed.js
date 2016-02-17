/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var is = __webpack_require__(1);
	var arrHas = __webpack_require__(5);
	var params = __webpack_require__(7);
	var Interface = __webpack_require__(6);

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


	var newVal = functionWithSomeParams.params('stringting', 111, ['arrayArg']);

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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var check = __webpack_require__(2);
	var maybeThrow = __webpack_require__(3);

	function is (type) {
	   switch (type) {
	    case 'string':
	       maybeThrow(check.isString(this), type, this);
	       break;
	    case 'array':
	      maybeThrow(check.isArray(this), type, this);
	      break;
	    case 'number':
	      maybeThrow(check.isNumber(this), type, this);
	      break;
	    case 'error': 
	       maybeThrow(check.isError(this), type, this);
	      break;
	    case 'object':
	       maybeThrow(check.isObject(this), type, this);
	      break;
	    default:
	      console.warn('No type matched');
	     break;
	   }

	   return this;
	}

	module.exports = is;


/***/ },
/* 2 */
/***/ function(module, exports) {

	var isArray = function(context) {
	    return context instanceof(Array);
	}
	var isString = function(context) {
	    return context instanceof(String);
	}
	var isObject = function(context) {
	    return context instanceof(Object) 
	      && !isArray(context)
	      && !isNumber(context);
	}
	var isNumber = function(context) {
	    return context instanceof(Number);
	}
	var isError = function(context) {
	    return context instanceof(Error);
	}
	var isFunction = function(context) {
	  return !!(context && context.constructor && context.call && context.apply);
	}; 


	module.exports = {
	  isArray:isArray,
	  isString: isString,
	  isObject: isObject, 
	  isNumber: isNumber, 
	  isError: isError,
	  isFunction: isFunction
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var err_action = __webpack_require__(4).err_action;

	function maybeThrow(Bool, type, self){
	  if (!Bool){
	    if (err_action === 'throw'){
	      throw Error("Monkeyface TypeError. Expected: " + type);
	    } else {
	      console.warn("Monkeyface TypeError. Expected:", type, self);
	    }
	  } else if(err_action == 'warn') {
	    console.log("Expected type: ", type, "Passed", self);
	  }
	}

	module.exports = maybeThrow;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {
	  err_action: 'throw'
	};



/***/ },
/* 5 */
/***/ function(module, exports) {

	var err_action = 'warn'; // or throw or log


	function arrHas (type) {
	   var passes;
	   if (type == 'string') {
	    passes = this.every(function(val){
	      return typeof val == 'string';
	    }) || this.length == 0;
	   }
	   if (passes) {
	    console.log("Expected type: arr of ", type, "Passed", this);
	    return this;
	   } else {
	    return maybeThrow(passes, type, this);
	   }
	}

	module.exports = arrHas;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = Interface;
	var check = __webpack_require__(2);

	var Interface = (function() {
	  function _Interface(cfg) {
	    this.props = null;
	    this.methods = null;
	    this._parseCfg(cfg);
	  }

	  _Interface.prototype._parseCfg = function(cfg) {

	    var isArray = check.isArray(cfg);
	    var props = [];
	    var methods = [];

	    if (isArray) {
	      cfg.forEach(function(str) {
	        var method = str.includes('()') ? str.slice(0, -2) : null;
	        if (method) {
	          methods.push(method);
	        } else {
	          props.push(str);
	        }
	      });
	    }
	    // should return
	    this.props = [];
	    this.methods = [];
	  };

	  // static method
	  _Interface.ensureImplements = function(obj, interface) {
	     
	  };

	  return _Interface;
	})();

	/*

	  Should take an array of properties, methods
	  or 
	  An object


	  ['private prop', 'public method()']

	*/


/***/ },
/* 7 */
/***/ function(module, exports) {

	
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

/***/ }
/******/ ]);