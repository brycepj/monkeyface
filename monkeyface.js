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

	/* WEBPACK VAR INJECTION */(function(global) {
	global.$require = function(name){
		return __webpack_require__(1)("./" + name);
	};

	module.exports = (function(){
		__webpack_require__(12);
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./api/ensureParams": 21,
		"./api/ensureParams.js": 21,
		"./api/has": 2,
		"./api/has.js": 2,
		"./api/hasOnly": 3,
		"./api/hasOnly.js": 3,
		"./api/implement": 4,
		"./api/implement.js": 4,
		"./api/is": 5,
		"./api/is.js": 5,
		"./api/not": 6,
		"./api/not.js": 6,
		"./models/Declaration": 8,
		"./models/Declaration.js": 8,
		"./models/Interface": 9,
		"./models/Interface.js": 9,
		"./patcher": 12,
		"./patcher.js": 12,
		"./patchers/All": 14,
		"./patchers/All.js": 14,
		"./patchers/Function": 15,
		"./patchers/Function.js": 15,
		"./patchers/Iterable": 16,
		"./patchers/Iterable.js": 16,
		"./patchers/index": 13,
		"./patchers/index.js": 13,
		"./services/InterfaceFactory": 17,
		"./services/InterfaceFactory.js": 17,
		"./services/env": 18,
		"./services/env.js": 18,
		"./services/maybeThrow": 19,
		"./services/maybeThrow.js": 19,
		"./services/mock": 20,
		"./services/mock.js": 20,
		"./services/typeChecker": 10,
		"./services/typeChecker.js": 10,
		"./services/utils": 11,
		"./services/utils.js": 11
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 1;


/***/ },
/* 2 */
/***/ function(module, exports) {

	var err_action = 'warn'; // or throw or log

	// FIXME: This literally does nothing.
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
/* 3 */
/***/ function(module, exports) {

	

/***/ },
/* 4 */
/***/ function(module, exports) {

	
	var check = $require('services/typeChecker');
	var maybeThrow = $require('services/maybeThrow');

	function implement (type) {
	  
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
	    case 'function':
	      maybeThrow(check.isFunction(this), type, this);
	      break;
	    case 'object':
	       maybeThrow(check.isObject(this), type, this);
	      break;
			case 'boolean':
	      maybeThrow(check.isBoolean(this), type, this);
	      break;
			case 'date':
	      maybeThrow(check.isDate(this), type, this);
	      break;
	    default:
	     maybeThrow(check.isInterface(this, type), type, this);
	     break;
	   }
	   return this;
	}

	module.exports = (function(){
		return implement;
	})();



/***/ },
/* 5 */
/***/ function(module, exports) {

	var check = $require('services/typeChecker');
	var maybeThrow = $require('services/maybeThrow');

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
	    case 'function':
	      maybeThrow(check.isFunction(this), type, this);
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
/* 6 */
/***/ function(module, exports) {

	

/***/ },
/* 7 */,
/* 8 */
/***/ function(module, exports) {

	var check = $require('services/typeChecker');

	var Declaration = (function(){

	  function _Declaration(configString){
	    // TODO: Perhaps use defaults
	    this.name = null; // the name of the property or method
	    this.required = null; // Boolean
	    this.type = null; // string, array, interface, function, boolean, etc
	    this.method = null; // Boolean
	    this._parseCfg(configString);
	  }

	  _Declaration.prototype._parseCfg = function(configString){
	    // TODO: includes is a new feature. Use regex here. 
	    var isMethod = configString.includes('()');
	    var isRequired = !configString.includes('?');
	    var type = configString.includes(':') ? configString.split(':')[1] : null;

	    this.required = isRequired;
	    this.method = isMethod; 
	    this.type = type; // TODO: Eventually this will need to lookup existing interfaces
	    this.name = this._parseName(configString);
	  };

	  _Declaration.prototype._parseName = function(configString){
	    configString = this.type ? configString.split(':')[0] : configString;
	    configString = !this.required ? configString.substr(1) : configString;
	    configString = this.method ? configString.slice(0, -2) : configString;
	    return configString;
	  };

	  _Declaration.prototype.validate = function(val, key){
	     
			var isRequired = this.required;
			var isMethod = this.method;
			var type = this.type;

			if (isRequired && !val) {return false} 
			else if (isMethod && !check.isFunction(val)) {return false} 
			else if (type && check.discernType(val) !== type) {return false}
			
			return true; 
	  };
	  return _Declaration;

	})();

	module.exports = Declaration;

/***/ },
/* 9 */
/***/ function(module, exports) {

	var check = $require('services/typeChecker');
	var u = $require('services/utils');

	var Interface = (function() {
	  
	  function _Interface(name, cfg) {
	    this.name = name;
	    this.declarations = [];
	    this._parseCfg(cfg);
	  }

	  _Interface.prototype._parseCfg = function(cfg) {
			var Declaration = $require('models/Declaration');
	    var self = this;
	    var isListCfg = check.isArray(cfg);
	    var isInferredCfg = check.isObject(cfg);

	    if (isListCfg) {
	      cfg.forEach(function(str) {
	        self.declarations.push(new Declaration(str));
	      });
	    } else if (isInferredCfg) {
	      u.forIn(cfg, function(value, key){
	        var type = check.discernType(value);
	        var str = type === 'function' ? key + '()' : [key, type].join(':');
	        self.declarations.push(new Declaration(str))
	      });
	    }
	  };
	  _Interface.prototype.validate = function(iterable){
	     return this.declarations.every(function(declaration, idx) {
				 var key = declaration.name;
				 var val = iterable[key];
				 return declaration.validate(val, key);
			 });
	  };
	  // static method
	  _Interface.ensureImplements = function(obj, iface) {
	     
	  };

	  return _Interface;
	})();

	module.exports = Interface;


/***/ },
/* 10 */
/***/ function(module, exports) {

	// TODO: See what I can do with this http://bonsaiden.github.io/JavaScript-Garden/#types
	var isArray = function(context) {
	    return context instanceof(Array);
	};
	isArray.type = 'array';

	var isString = function(context) {
	    return context instanceof(String) || typeof context === 'string';
	};
	isString.type = 'string';

	var isObject = function(context) {
	    return typeof context == 'object' 
	      && !isArray(context)
	      && !isNumber(context)
				&& !isNull(context)
				&& !isError(context)
				&& !isDate(context);
	};
	isObject.type = 'object';

	var isNumber = function(context) {
	    return context instanceof(Number) || typeof context === 'number';
	};
	isNumber.type = 'number';

	var isError = function(context) {
	    return context instanceof(Error);
	};
	isError.type = 'error';

	var isFunction = function(context) {
	  return !!(context && context.constructor && context.call && context.apply);
	}; 
	isFunction.type = 'function';


	var isBoolean = function (context) {
	   return context === true || context === false || toString.call(context) == '[object Boolean]'; 
	};
	isBoolean.type = 'boolean';

	var isNull = function(context) {
		return context === null;
	}
	isNull.type = 'null';


	var isDate = function(context) {
		return context instanceof Date;
	};
	isDate.type = 'date';

	var discernType = function (val) {
	   return [isNull, isBoolean, isString, isNumber, isFunction, isError, isArray, isObject]
	    .find(function(fn, index){
	       return fn(val);
	     }).type;
	};

	var isInterface = function(iterable, key){
		var Interface = $require('services/InterfaceFactory');
		var iface = Interface.getInterface(key);
		return iface && Interface.ensureImplements(iterable, iface);
	};

	module.exports = {
	  isArray:isArray,
	  isString: isString,
	  isObject: isObject, 
	  isNumber: isNumber, 
	  isError: isError,
	  isFunction: isFunction,
		isNull: isNull,
		isBoolean: isBoolean,
		isDate: isDate,
		isInterface: isInterface,
	  discernType: discernType
	}

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = {
	  forIn: forIn,
	  times: times, 
		everyIn: everyIn,
		mapObj: mapObj
	}


	function forIn (object, iteratee) {
	   for (var key in object) {
	      if (object.hasOwnProperty(key)) {
	        iteratee(object[key], key);
	      }
	   }
	}

	function times(iterations, fn) {
	  while (iterations--) {
	    fn();
	  }
	}

	function everyIn(object, iteratee) {
		var passes = true;
		for (var key in object) {
			if (object.hasOwnProperty(key)) {
				var val = object[key];
				if (!iteratee(val, key)) {
					passes = undefined;
					break;
				}
			}
	   }
		 return passes;
	}

	// maps object to array
	function mapObj(object, iteratee) {
		var arr = [];
		for (var key in object) {
			if (object.hasOwnProperty(key)) {
				var val = object[key];
				arr.push(iteratee(val, key));
			}
		}
		return arr;
	}

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = (function() {
		$require('patchers');
	})();

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (function(){
		__webpack_require__(14);
		__webpack_require__(15);
		__webpack_require__(16);
	})();

	 /*
	 
	 var cfg = [
	  'helloProp', 
	  'helloMethod()', 
	  '?helloOptionalProp', 
	  '?helloOptionalMethod',
	  'helloProp2:string',
	  'helloProp3:string[]', 
	  'helloProp4:secondInterface'
	  ];
	  var config = { hello: 'world', sprack: function(){}};

	  console.log('Singleton', Interface);
	  console.log('NewInterface', Interface.create('sweetInterfaceBro', _));
		
		*/

/***/ },
/* 14 */
/***/ function(module, exports) {

	var _ = $require('services/utils');
	var Interface = $require('services/InterfaceFactory');
	var implement = $require('api/implement');
	var env = $require('services/env');
	var Types = [ String, Array, Object, Number, Error, Boolean, Date];

	var Methods = {
		implement: implement
	};

	module.exports = (function() {

		Types.forEach(function(NativeClass, key){
			patchMethods(NativeClass, Methods);
		});
		
		// This is where you left off.
		// You need to be able to accept an interface reference as an interface as well
		var iface = Interface.createInterface('superBadInterface', ['hello:string']);
		console.log(iface);
		var tester = {
			hello: 'world'
		};
		
		tester = tester.implement(iface);
		console.log('tester after implement', tester);
	})();

	function patchMethods(Class, methodsMap) {
		_.forIn(methodsMap, function(val, key){
			var name = key, method = val;
			Class.prototype[name] = val;
		});
	}




/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = (function() {
		Function.prototype.ensureParams = $require('api/ensureParams');
		
		
	var newVal = functionWithSomeParams.ensureParams('stringting', 111, ['arrayArg']);

	function functionWithSomeParams (arg1__string, arg2__number, arg3__array) {
	   console.log("Hello this is the function with the params", arg1__string, arg2__number, arg3__array);
	}

	})();



/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = (function() {
		
	})();


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var registry = __webpack_require__(18).registry;
	var global_svc = __webpack_require__(18).svc;

	var InterfaceFactory = (function(){
	  function _InterfaceFactory () {}

	  _InterfaceFactory.prototype.createInterface = function(name, cfg){
			var Interface = $require('models/Interface');
	    var newInterface = new Interface(name, cfg); // name
	    this._register(newInterface);
	    return newInterface;
	  };

	  _InterfaceFactory.prototype._register = function(i){
	    var name = i.name;
			console.log(registry);
	    registry[name] = i; 
	  };

	  _InterfaceFactory.prototype._checkRegistryKey = function(key){
	     return !!this.getInterface(key);
	  };

	  _InterfaceFactory.prototype.getRegistryKeys = function(){
	     return registry.keys; 
	  };

	  _InterfaceFactory.prototype.getInterface = function(key){
	     return registry[key] || false;
	  };

	  _InterfaceFactory.prototype.setInterface = function(key, i){
	     registry[key] = i;
	  };

	  _InterfaceFactory.prototype.ensureImplements = function(val, iface){
	    // i supports string ref, or actual interface
	    return iface.validate(val);
	  };

	  return _InterfaceFactory;
	})();

	var factory = global_svc['Interface'] = new InterfaceFactory();
	module.exports = factory;

/***/ },
/* 18 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {var platform, registry;
	var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
	var isNode = new Function("try {return this===global;}catch(e){return false;}");

	if(isNode() && global) platform = 'node';
	if(isBrowser() && window) platform = 'browser';  

	var top = platform == 'node' ? global : window;

	var registry = top.__interfaces = {};
	var global_svc = top;

	module.exports = {
	  err_action: 'warn',
	  registry: registry,
	  platform: platform,
	  svc: global_svc
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 19 */
/***/ function(module, exports) {

	var err_action = $require('services/env').err_action;

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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var u = __webpack_require__(11);
	// FIXME: This shoudl be in tests. It isn't useful in library code.
	function noop(){}

	function MockInterfaceConfigClass() {
	  this.stringProp = 'stringery';
	  this.numberProp = 1;
	  this.objectProp = {};
	  this.arrayProp = [];
		this.nullType = null;
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

/***/ },
/* 21 */
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
	    val.implement(type);
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