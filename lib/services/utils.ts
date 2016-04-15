function forEach(arr, iteratee) {
  arr.forEach(iteratee);
}

function forIn(object, iteratee) {
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

var returnError = function(msg?: string): boolean {
  if (msg) {
    throw new Error(msg);
  }
  return false;
};

var methodPatcher = function(native, name, method) {
  // Object, function ensure(){};
  Object.defineProperty(native.prototype, name, {
    enumerable: false,
    value: method,
    writable: true,
    configurable: false
  });
};

export = {
  forEach: forEach,
  forIn: forIn,
  times: times,
  everyIn: everyIn,
  mapObj: mapObj,
  returnError: returnError,
  methodPatcher: methodPatcher
}
