<div style="text-align:center"><img src ="./assets/monkeyface-logo.png"/></div>

No-mess, declarative type checking and interfaces in Javascript without a build step. 

*This library is pretty new, poorly documented, and a little dangerous by design. Use at your peril.*

The `$ensure` method has been monkey-patched (read about monkey-patching [here](http://me.dt.in.th/page/JavaScript-override/))
to the following types/primitives:`Function`, `Number`, `Boolean`, `Date`, `Object`, `Array`, `String`, and `Error` (not 
`undefined` or `null`). The `$params` method has been monkey-patched to the `Function` type only, although it can validates 
any type you can pass to `$ensure`.

## type checking with `$ensure`:

```javascript
const i = require('monkeyface');

// when mustBeANumber is declared, if couldBeANumber is anything but a number, a (helpful) error is thrown

var couldBeANumber = Math.floor(Math.random(0,1) ? 123456 : 'some string';
var mustBeANumber = couldBeANumber.$ensure('number');

// $ensure enforces interfaces too (more on how these work later)

var iHelloWorld = i.create('iHelloWorld', ['hello', 'world']);

function helloWorldReturner(someVal){
  return someVal.$ensure('iHelloWorld');
}

var goodObj = {
  hello: "this", 
  world: "that"
};

var badObj = {
  wack: "adoodle"
};

// this returns goodObj
var validObject = helloWorldReturner(goodObj);

// this throws an error
var invalidObject = helloWorldReturner(badObj);


// you can also use $ensure to check collections (includes collections of all types)

var someRawCollection = [1, 2, 3, 4, 5, null];
var someRawCollectionFiltered = someRawCollection.filter(function(item){ return typeof item === 'number'});

var numberCollection = someRawCollection.$ensure('[number]'); // throws an error
var numberCollection = someRawCollectionFiltered.$ensure('[number]');

```

## parameter type checking with $params (checked upon execution)

```javascript
function aReallyPickyFunction(someVal$number, someObj$iHelloWorld){
  // do stuff
}

aReallyPickyFunction(1, {'hello': 'this', 'world', 'that'}); // proceeds as expected
aReallyPickyFunction(null, {}); // throws an error
aReallyPickyFunction(); // throws an error
aReallyPickyFunction({'hello': 'this', 'world', 'that'}, 1); // throws an error (args out of order)

```

## interfaces (syntax mostly mimics Typescript's)

```

const i = require('monkeyface');

// interfaces are initialized with `create` or `register`. Both make an interface available throughout
// the application, but `create` actually returns the interface object. 

var iCar = i.create('iCar', [
  'numberOfWheels:number', 
  'fins?:boolean', 
  'make:string', 
  'model?',
  'type:iGasPoweredVehicle',
  'accidents?:[Accident]' 
]);

// now you have some options. someVehical is returned in each case

var myCar = someVehical.$ensure('iCar'); // ensures someVehicle implements iCar

// or

var myCar = someVehical.$ensure(iCar); // note, you can pass the interface directly

// or

var myCar = iCar.validate(someVehical) // also, ensures someVehicle implements iCar

```

## inferred interfaces

create an interface from an existing object. 

```
const i = require('monkeyface');

var myCar = new Car();

var iCar = i.create('iCar', myCar);

// or more usefully, infer types from third party libraries and 

var Promise = require('bluebird');

var iPromise = i.create('iPromise', Promise);

var getSomeFile = promisifiedRequest('something.txt').$ensure('iPromise');

```