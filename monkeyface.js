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

	__webpack_require__(17);

	function notyet() {
	  var is = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./lib/is\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var arrHas = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./lib/has\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var params = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./lib/params\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var InterfaceFactory = __webpack_require__(7);
	var Interface = __webpack_require__(8);
	var mock = __webpack_require__(11);

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

	  InterfaceFactory.create('testInterfaceFromMock', mock.Obj);
	}

	main();


	var newVal = functionWithSomeParams.params('stringting', 111, ['arrayArg']);

	function functionWithSomeParams (arg1__string, arg2__number, arg3__array) {
	   console.log("Hello this is the function with the params", arg1__string, arg2__number, arg3__array);
	}

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

	var env = __webpack_require__(4);
	var Interface = __webpack_require__(7);
	var _ = __webpack_require__(12);

	module.exports = (function(){
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
	})();

/***/ },
/* 1 */,
/* 2 */
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
	  discernType: discernType
	}

/***/ },
/* 3 */,
/* 4 */
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
	  err_action: 'throw',
	  registry: registry,
	  platform: platform,
	  svc: global_svc
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var registry = __webpack_require__(4).registry;
	var Interface = __webpack_require__(8);
	var global_svc = __webpack_require__(4).svc;

	var InterfaceFactory = (function(){
	  function _InterfaceFactory () {}

	  _InterfaceFactory.prototype.create = function(name, cfg){
	    var newInterface = new Interface(name, cfg); // name
	    this._register(newInterface);
	    return newInterface;
	  };

	  _InterfaceFactory.prototype._register = function(i){
	    var name = i.name;
	    registry[name] = i; 
	  };

	  _InterfaceFactory.prototype._checkRegistryKey = function(key){
	     return !!this.getInterface(key);
	  };

	  _InterfaceFactory.prototype.getRegistryKeys = function(){
	     return registry.keys; 
	  };

	  _InterfaceFactory.prototype.getInterface = function(key){
	     return registry[key];
	  };

	  _InterfaceFactory.prototype.setInterface = function(key, i){
	     registry[key] = i;
	  };

	  _InterfaceFactory.prototype.ensureImplements = function(val, i){
	    // i supports string ref, or actual interface
	    var isKey = typeof i === 'string' && this._checkRegistryKey(i);
	    var result = isKey ? this.getInterface(i).validate(val) : i.validate(val);
	    return result;
	  };

	  return _InterfaceFactory;
	})();

	var factory = global_svc['Interface'] = new InterfaceFactory();
	module.exports = factory;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var check = __webpack_require__(2);
	var Declaration = __webpack_require__(9);
	var u = __webpack_require__(10);

	var Interface = (function() {
	  
	  function _Interface(name, cfg) {
	    this.name = name;
	    this.declarations = [];
	    this._parseCfg(cfg);
	  }

	  _Interface.prototype._parseCfg = function(cfg) {
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
	  _Interface.prototype.validate = function(argument){
	     // body...  
	     return true;
	  };
	  // static method
	  _Interface.ensureImplements = function(obj, interface) {
	     
	  };

	  return _Interface;
	})();

	module.exports = Interface;


/***/ },
/* 9 */
/***/ function(module, exports) {

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

	  _Declaration.prototype.validate = function(argument){
	     // TODO 
	  };
	  return _Declaration;

	})();





	module.exports = Declaration;

/***/ },
/* 10 */
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var u = __webpack_require__(10);

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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var path = __webpack_require__(14);
	var minimist = __webpack_require__(15);
	var wordwrap = __webpack_require__(16);

	/*  Hack an instance of Argv with process.argv into Argv
	    so people can do
	        require('optimist')(['--beeble=1','-z','zizzle']).argv
	    to parse a list of args and
	        require('optimist').argv
	    to get a parsed version of process.argv.
	*/

	var inst = Argv(process.argv.slice(2));
	Object.keys(inst).forEach(function (key) {
	    Argv[key] = typeof inst[key] == 'function'
	        ? inst[key].bind(inst)
	        : inst[key];
	});

	var exports = module.exports = Argv;
	function Argv (processArgs, cwd) {
	    var self = {};
	    if (!cwd) cwd = process.cwd();
	    
	    self.$0 = process.argv
	        .slice(0,2)
	        .map(function (x) {
	            var b = rebase(cwd, x);
	            return x.match(/^\//) && b.length < x.length
	                ? b : x
	        })
	        .join(' ')
	    ;
	    
	    if (process.env._ != undefined && process.argv[1] == process.env._) {
	        self.$0 = process.env._.replace(
	            path.dirname(process.execPath) + '/', ''
	        );
	    }
	    
	    var options = {
	        boolean: [],
	        string: [],
	        alias: {},
	        default: []
	    };
	    
	    self.boolean = function (bools) {
	        options.boolean.push.apply(options.boolean, [].concat(bools));
	        return self;
	    };
	    
	    self.string = function (strings) {
	        options.string.push.apply(options.string, [].concat(strings));
	        return self;
	    };
	    
	    self.default = function (key, value) {
	        if (typeof key === 'object') {
	            Object.keys(key).forEach(function (k) {
	                self.default(k, key[k]);
	            });
	        }
	        else {
	            options.default[key] = value;
	        }
	        return self;
	    };
	    
	    self.alias = function (x, y) {
	        if (typeof x === 'object') {
	            Object.keys(x).forEach(function (key) {
	                self.alias(key, x[key]);
	            });
	        }
	        else {
	            options.alias[x] = (options.alias[x] || []).concat(y);
	        }
	        return self;
	    };
	    
	    var demanded = {};
	    self.demand = function (keys) {
	        if (typeof keys == 'number') {
	            if (!demanded._) demanded._ = 0;
	            demanded._ += keys;
	        }
	        else if (Array.isArray(keys)) {
	            keys.forEach(function (key) {
	                self.demand(key);
	            });
	        }
	        else {
	            demanded[keys] = true;
	        }
	        
	        return self;
	    };
	    
	    var usage;
	    self.usage = function (msg, opts) {
	        if (!opts && typeof msg === 'object') {
	            opts = msg;
	            msg = null;
	        }
	        
	        usage = msg;
	        
	        if (opts) self.options(opts);
	        
	        return self;
	    };
	    
	    function fail (msg) {
	        self.showHelp();
	        if (msg) console.error(msg);
	        process.exit(1);
	    }
	    
	    var checks = [];
	    self.check = function (f) {
	        checks.push(f);
	        return self;
	    };
	    
	    var descriptions = {};
	    self.describe = function (key, desc) {
	        if (typeof key === 'object') {
	            Object.keys(key).forEach(function (k) {
	                self.describe(k, key[k]);
	            });
	        }
	        else {
	            descriptions[key] = desc;
	        }
	        return self;
	    };
	    
	    self.parse = function (args) {
	        return parseArgs(args);
	    };
	    
	    self.option = self.options = function (key, opt) {
	        if (typeof key === 'object') {
	            Object.keys(key).forEach(function (k) {
	                self.options(k, key[k]);
	            });
	        }
	        else {
	            if (opt.alias) self.alias(key, opt.alias);
	            if (opt.demand) self.demand(key);
	            if (typeof opt.default !== 'undefined') {
	                self.default(key, opt.default);
	            }
	            
	            if (opt.boolean || opt.type === 'boolean') {
	                self.boolean(key);
	            }
	            if (opt.string || opt.type === 'string') {
	                self.string(key);
	            }
	            
	            var desc = opt.describe || opt.description || opt.desc;
	            if (desc) {
	                self.describe(key, desc);
	            }
	        }
	        
	        return self;
	    };
	    
	    var wrap = null;
	    self.wrap = function (cols) {
	        wrap = cols;
	        return self;
	    };
	    
	    self.showHelp = function (fn) {
	        if (!fn) fn = console.error;
	        fn(self.help());
	    };
	    
	    self.help = function () {
	        var keys = Object.keys(
	            Object.keys(descriptions)
	            .concat(Object.keys(demanded))
	            .concat(Object.keys(options.default))
	            .reduce(function (acc, key) {
	                if (key !== '_') acc[key] = true;
	                return acc;
	            }, {})
	        );
	        
	        var help = keys.length ? [ 'Options:' ] : [];
	        
	        if (usage) {
	            help.unshift(usage.replace(/\$0/g, self.$0), '');
	        }
	        
	        var switches = keys.reduce(function (acc, key) {
	            acc[key] = [ key ].concat(options.alias[key] || [])
	                .map(function (sw) {
	                    return (sw.length > 1 ? '--' : '-') + sw
	                })
	                .join(', ')
	            ;
	            return acc;
	        }, {});
	        
	        var switchlen = longest(Object.keys(switches).map(function (s) {
	            return switches[s] || '';
	        }));
	        
	        var desclen = longest(Object.keys(descriptions).map(function (d) { 
	            return descriptions[d] || '';
	        }));
	        
	        keys.forEach(function (key) {
	            var kswitch = switches[key];
	            var desc = descriptions[key] || '';
	            
	            if (wrap) {
	                desc = wordwrap(switchlen + 4, wrap)(desc)
	                    .slice(switchlen + 4)
	                ;
	            }
	            
	            var spadding = new Array(
	                Math.max(switchlen - kswitch.length + 3, 0)
	            ).join(' ');
	            
	            var dpadding = new Array(
	                Math.max(desclen - desc.length + 1, 0)
	            ).join(' ');
	            
	            var type = null;
	            
	            if (options.boolean[key]) type = '[boolean]';
	            if (options.string[key]) type = '[string]';
	            
	            if (!wrap && dpadding.length > 0) {
	                desc += dpadding;
	            }
	            
	            var prelude = '  ' + kswitch + spadding;
	            var extra = [
	                type,
	                demanded[key]
	                    ? '[required]'
	                    : null
	                ,
	                options.default[key] !== undefined
	                    ? '[default: ' + JSON.stringify(options.default[key]) + ']'
	                    : null
	                ,
	            ].filter(Boolean).join('  ');
	            
	            var body = [ desc, extra ].filter(Boolean).join('  ');
	            
	            if (wrap) {
	                var dlines = desc.split('\n');
	                var dlen = dlines.slice(-1)[0].length
	                    + (dlines.length === 1 ? prelude.length : 0)
	                
	                body = desc + (dlen + extra.length > wrap - 2
	                    ? '\n'
	                        + new Array(wrap - extra.length + 1).join(' ')
	                        + extra
	                    : new Array(wrap - extra.length - dlen + 1).join(' ')
	                        + extra
	                );
	            }
	            
	            help.push(prelude + body);
	        });
	        
	        help.push('');
	        return help.join('\n');
	    };
	    
	    Object.defineProperty(self, 'argv', {
	        get : function () { return parseArgs(processArgs) },
	        enumerable : true,
	    });
	    
	    function parseArgs (args) {
	        var argv = minimist(args, options);
	        argv.$0 = self.$0;
	        
	        if (demanded._ && argv._.length < demanded._) {
	            fail('Not enough non-option arguments: got '
	                + argv._.length + ', need at least ' + demanded._
	            );
	        }
	        
	        var missing = [];
	        Object.keys(demanded).forEach(function (key) {
	            if (!argv[key]) missing.push(key);
	        });
	        
	        if (missing.length) {
	            fail('Missing required arguments: ' + missing.join(', '));
	        }
	        
	        checks.forEach(function (f) {
	            try {
	                if (f(argv) === false) {
	                    fail('Argument check failed: ' + f.toString());
	                }
	            }
	            catch (err) {
	                fail(err)
	            }
	        });
	        
	        return argv;
	    }
	    
	    function longest (xs) {
	        return Math.max.apply(
	            null,
	            xs.map(function (x) { return x.length })
	        );
	    }
	    
	    return self;
	};

	// rebase an absolute path to a relative one with respect to a base directory
	// exported for tests
	exports.rebase = rebase;
	function rebase (base, dir) {
	    var ds = path.normalize(dir).split('/').slice(1);
	    var bs = path.normalize(base).split('/').slice(1);
	    
	    for (var i = 0; ds[i] && ds[i] == bs[i]; i++);
	    ds.splice(0, i); bs.splice(0, i);
	    
	    var p = path.normalize(
	        bs.map(function () { return '..' }).concat(ds).join('/')
	    ).replace(/\/$/,'').replace(/^$/, '.');
	    return p.match(/^[.\/]/) ? p : './' + p;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ },
/* 13 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }

	  return parts;
	}

	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};

	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;

	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();

	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }

	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }

	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)

	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');

	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};

	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';

	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');

	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }

	  return (isAbsolute ? '/' : '') + path;
	};

	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};

	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};


	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);

	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }

	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }

	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }

	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));

	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }

	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }

	  outputParts = outputParts.concat(toParts.slice(samePartsLength));

	  return outputParts.join('/');
	};

	exports.sep = '/';
	exports.delimiter = ':';

	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];

	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }

	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }

	  return root + dir;
	};


	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};


	exports.extname = function(path) {
	  return splitPath(path)[3];
	};

	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}

	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function (args, opts) {
	    if (!opts) opts = {};
	    
	    var flags = { bools : {}, strings : {} };
	    
	    [].concat(opts['boolean']).filter(Boolean).forEach(function (key) {
	        flags.bools[key] = true;
	    });
	    
	    [].concat(opts.string).filter(Boolean).forEach(function (key) {
	        flags.strings[key] = true;
	    });
	    
	    var aliases = {};
	    Object.keys(opts.alias || {}).forEach(function (key) {
	        aliases[key] = [].concat(opts.alias[key]);
	        aliases[key].forEach(function (x) {
	            aliases[x] = [key].concat(aliases[key].filter(function (y) {
	                return x !== y;
	            }));
	        });
	    });
	    
	    var defaults = opts['default'] || {};
	    
	    var argv = { _ : [] };
	    Object.keys(flags.bools).forEach(function (key) {
	        setArg(key, defaults[key] === undefined ? false : defaults[key]);
	    });
	    
	    var notFlags = [];

	    if (args.indexOf('--') !== -1) {
	        notFlags = args.slice(args.indexOf('--')+1);
	        args = args.slice(0, args.indexOf('--'));
	    }

	    function setArg (key, val) {
	        var value = !flags.strings[key] && isNumber(val)
	            ? Number(val) : val
	        ;
	        setKey(argv, key.split('.'), value);
	        
	        (aliases[key] || []).forEach(function (x) {
	            setKey(argv, x.split('.'), value);
	        });
	    }
	    
	    for (var i = 0; i < args.length; i++) {
	        var arg = args[i];
	        
	        if (/^--.+=/.test(arg)) {
	            // Using [\s\S] instead of . because js doesn't support the
	            // 'dotall' regex modifier. See:
	            // http://stackoverflow.com/a/1068308/13216
	            var m = arg.match(/^--([^=]+)=([\s\S]*)$/);
	            setArg(m[1], m[2]);
	        }
	        else if (/^--no-.+/.test(arg)) {
	            var key = arg.match(/^--no-(.+)/)[1];
	            setArg(key, false);
	        }
	        else if (/^--.+/.test(arg)) {
	            var key = arg.match(/^--(.+)/)[1];
	            var next = args[i + 1];
	            if (next !== undefined && !/^-/.test(next)
	            && !flags.bools[key]
	            && (aliases[key] ? !flags.bools[aliases[key]] : true)) {
	                setArg(key, next);
	                i++;
	            }
	            else if (/^(true|false)$/.test(next)) {
	                setArg(key, next === 'true');
	                i++;
	            }
	            else {
	                setArg(key, flags.strings[key] ? '' : true);
	            }
	        }
	        else if (/^-[^-]+/.test(arg)) {
	            var letters = arg.slice(1,-1).split('');
	            
	            var broken = false;
	            for (var j = 0; j < letters.length; j++) {
	                var next = arg.slice(j+2);
	                
	                if (next === '-') {
	                    setArg(letters[j], next)
	                    continue;
	                }
	                
	                if (/[A-Za-z]/.test(letters[j])
	                && /-?\d+(\.\d*)?(e-?\d+)?$/.test(next)) {
	                    setArg(letters[j], next);
	                    broken = true;
	                    break;
	                }
	                
	                if (letters[j+1] && letters[j+1].match(/\W/)) {
	                    setArg(letters[j], arg.slice(j+2));
	                    broken = true;
	                    break;
	                }
	                else {
	                    setArg(letters[j], flags.strings[letters[j]] ? '' : true);
	                }
	            }
	            
	            var key = arg.slice(-1)[0];
	            if (!broken && key !== '-') {
	                if (args[i+1] && !/^(-|--)[^-]/.test(args[i+1])
	                && !flags.bools[key]
	                && (aliases[key] ? !flags.bools[aliases[key]] : true)) {
	                    setArg(key, args[i+1]);
	                    i++;
	                }
	                else if (args[i+1] && /true|false/.test(args[i+1])) {
	                    setArg(key, args[i+1] === 'true');
	                    i++;
	                }
	                else {
	                    setArg(key, flags.strings[key] ? '' : true);
	                }
	            }
	        }
	        else {
	            argv._.push(
	                flags.strings['_'] || !isNumber(arg) ? arg : Number(arg)
	            );
	        }
	    }
	    
	    Object.keys(defaults).forEach(function (key) {
	        if (!hasKey(argv, key.split('.'))) {
	            setKey(argv, key.split('.'), defaults[key]);
	            
	            (aliases[key] || []).forEach(function (x) {
	                setKey(argv, x.split('.'), defaults[key]);
	            });
	        }
	    });
	    
	    notFlags.forEach(function(key) {
	        argv._.push(key);
	    });

	    return argv;
	};

	function hasKey (obj, keys) {
	    var o = obj;
	    keys.slice(0,-1).forEach(function (key) {
	        o = (o[key] || {});
	    });

	    var key = keys[keys.length - 1];
	    return key in o;
	}

	function setKey (obj, keys, value) {
	    var o = obj;
	    keys.slice(0,-1).forEach(function (key) {
	        if (o[key] === undefined) o[key] = {};
	        o = o[key];
	    });
	    
	    var key = keys[keys.length - 1];
	    if (o[key] === undefined || typeof o[key] === 'boolean') {
	        o[key] = value;
	    }
	    else if (Array.isArray(o[key])) {
	        o[key].push(value);
	    }
	    else {
	        o[key] = [ o[key], value ];
	    }
	}

	function isNumber (x) {
	    if (typeof x === 'number') return true;
	    if (/^0x[0-9a-f]+$/i.test(x)) return true;
	    return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(x);
	}

	function longest (xs) {
	    return Math.max.apply(null, xs.map(function (x) { return x.length }));
	}


/***/ },
/* 16 */
/***/ function(module, exports) {

	var wordwrap = module.exports = function (start, stop, params) {
	    if (typeof start === 'object') {
	        params = start;
	        start = params.start;
	        stop = params.stop;
	    }
	    
	    if (typeof stop === 'object') {
	        params = stop;
	        start = start || params.start;
	        stop = undefined;
	    }
	    
	    if (!stop) {
	        stop = start;
	        start = 0;
	    }
	    
	    if (!params) params = {};
	    var mode = params.mode || 'soft';
	    var re = mode === 'hard' ? /\b/ : /(\S+\s+)/;
	    
	    return function (text) {
	        var chunks = text.toString()
	            .split(re)
	            .reduce(function (acc, x) {
	                if (mode === 'hard') {
	                    for (var i = 0; i < x.length; i += stop - start) {
	                        acc.push(x.slice(i, i + stop - start));
	                    }
	                }
	                else acc.push(x)
	                return acc;
	            }, [])
	        ;
	        
	        return chunks.reduce(function (lines, rawChunk) {
	            if (rawChunk === '') return lines;
	            
	            var chunk = rawChunk.replace(/\t/g, '    ');
	            
	            var i = lines.length - 1;
	            if (lines[i].length + chunk.length > stop) {
	                lines[i] = lines[i].replace(/\s+$/, '');
	                
	                chunk.split(/\n/).forEach(function (c) {
	                    lines.push(
	                        new Array(start + 1).join(' ')
	                        + c.replace(/^\s+/, '')
	                    );
	                });
	            }
	            else if (chunk.match(/\n/)) {
	                var xs = chunk.split(/\n/);
	                lines[i] += xs.shift();
	                xs.forEach(function (c) {
	                    lines.push(
	                        new Array(start + 1).join(' ')
	                        + c.replace(/^\s+/, '')
	                    );
	                });
	            }
	            else {
	                lines[i] += chunk;
	            }
	            
	            return lines;
	        }, [ new Array(start + 1).join(' ') ]).join('\n');
	    };
	};

	wordwrap.soft = wordwrap;

	wordwrap.hard = function (start, stop) {
	    return wordwrap(start, stop, { mode : 'hard' });
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (function(){
		__webpack_require__(18);
		__webpack_require__(19);
		__webpack_require__(20);
	})()

/***/ },
/* 18 */
/***/ function(module, exports) {

	// TODO: Add Interface to this list
	var Types = [ String, Array, Object, Number, Error, Boolean, Date];

	module.exports = (function() {
		
	})();







/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = (function() {
		
	})();


/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = (function() {
		
	})();


/***/ }
/******/ ]);