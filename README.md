<div style="text-align:center"><img src ="assets/monkeyface-logo.png"/></div>
# monkeyface
No-mess, declarative type checking and interfaces in Javascript without a build step. 

*This library is pretty new and a little dangerous by design. Use at your peril.*

## type checking with `$ensure`: 

The `$ensure` method has been monkey-patched (read about monkey-patching [here](http://me.dt.in.th/page/JavaScript-override/))
to the following types/primitives: `Function`, `Number`, `Boolean`, `Date`, `Object`, `Array`, `String`, and `Error` (not 
`undefined` or `null`).

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

## parameter type checking with $params
The `$params` method has been monkey-patched to the `Function` type. Validates any type you can 
validate with `$ensure`. 

```javascript
function aReallyPickyFunction(someVal__number, someObj__iHelloWorld, someCollection__[string]){
  // do stuff
}

aReallyPickyFunction(1, {'hello': 'this', 'world', 'that'}, ['string1', 'string2']); // proceeds as expected
aReallyPickyFunction(null, {}, 'wrong'); // throws an error
aReallyPickyFunction(); // throws an error
aReallyPickyFunction({'hello': 'this', 'world', 'that'}, ['string1', 'string2'], 1); // throws an error (args out of order)

```

