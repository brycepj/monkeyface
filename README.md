No-mess, declarative typechecking and interfaces in Javascript. 
 
## What is this all about?

I don't know how many people will want to use this little library, but I use it all the time. I wrote it so I could quickly get interfaces and typechecking in Javascript, without the setup and/or build step that come with other typechecking tools like [TypeScript](https://www.typescriptlang.org/) or [Flow](https://github.com/facebook/flow). As far as I can tell, this is the simplest, quickest possible way to introduce typechecking and interfaces into a Javascript application. 

You just do this: 

```
npm install --save monkeyface
```
then, somewhere in your application, initialize monkeyface:

```javascript

// no config
require('monkeyface')();

// with config
require('monkeyface')({/* options, see documentation below */});

``` 

Then you can use typechecking (without imports/requires) and interfaces anywhere in your code.

### Typechecking

```javascript

// ensures passed value is a number
function numberReturner(num){
  return num.$ensure('number');
}

// ensures that obj implements iHelloWorld interface
function objReturner(obj) {
  return obj.$ensure('iHelloWorld');
}

// ensures collection contains only iHelloWorld objects
function collectionReturner(coll) {
  return coll.$ensure('iHelloWorld[]')
}

function pickyForNumbers(arg$number){
  // do stuff
}

pickyForNumbers.$params(123); // ensures arg is a number, then executes

function pickyForIHelloWorlds(arg$iHelloWorld){
  // do stuff
}

pickyForIHelloWorlds.$params({hello:1,world:2}); // ensures arg implements iHelloWorld, then executes

function pickyForCollections(arg$iHelloWorlds) { 
  // note the 's'. Works for basic types too (e.g. 'numbers', 'arrays')
}

// ensures collection items implement iHelloWorld, then executes
pickyForCollections.$params([{hello:1,world:2}, {hello:3, world: 4}]); 

```

### Monkeypatching native types

This library works by monkey patching native types. The `$ensure` method has been monkey-patched (read about monkey-patching [here](http://me.dt.in.th/page/JavaScript-override/)) to the following types/primitives:`Function`, `Number`, `Boolean`, `Date`, `Object`, `Array`, `String`, and `Error` (not `undefined` or `null`). The `$params` method has been monkey-patched to the `Function` type only.

Admittedly this could be a little dangerous. It means that any references to `$ensure` or `$params` method anywhere in your application *or any of its dependencies* could conflict with monkeyface's. If that's the case, you can configure monkeyface to substitute any key you want for `$ensure` or `$params`. Having said that, I have yet to have an issue with conflicts. 

### Performance

It may slow down your code in development(see `./perf`), but in production the public api turns into a bunch of [noops](http://whatis.techtarget.com/definition/no-op-no-operation). 

## Interfaces

```javascript

var i = require('monkeyface');

var iCar = i.create('iCar', [
  'numberOfWheels:number', 
  'fins?:boolean', // optional boolean
  'make:string', 
  'model?', // optional anything
  'type:iGasPoweredVehicle', // interface
  'accidents?:Accident[]' // collection of accidents 
]);

// now you have some options. someVehical is returned in each case.

var myCar = someVehical.$ensure('iCar'); // pass the interface name

var myCar = someVehical.$ensure(iCar); // pass the interface object

var myCar = iCar.validate(someVehical) // use the interface to validate values (returns a boolean)

```

### Inferred interfaces

You can create an interface from an existing object. This is helpful if you want to create interfaces with third-party libraries or complex objects.

```javascript
var i = require('monkeyface');

// complex object
var myCar = new Car();
var iCar = i.create('iCar', myCar);

// third party 
var Promise = require('bluebird');
var iPromise = i.create('iPromise', new Promise(() => {})); 
var getSomeFile = promisifiedRequest('something.txt').$ensure('iPromise');

```
### Config 

```javascript

require('monkeyface')({
  env: 'production', // 'production' or 'development'. Checks process.env, then defaults to 'development'
  ensure: {
    key: '$$alternateEnsure'// overrides use of '$ensure'
  },
  params: {
    key: '$$alternateParams' // override use of '$params'
  }
  exceptions: {
    action: 'error', // 'error' (throws error), 'warn' (console.warn) or 'debug' (console.log), defaults to 'error'
    middleware: [fn, fn], // functions are each passed error object and must return it
    handler: fn // custom function to handle error throwing (receives error object)
  }
})

```
### Roadmap

There's still a lot to do to get this where I want it to be. 

- better support browser javascript
- more typechecking methods (e.g. $not) 
- config options for inferred objects
- accept interface props confi
- better test coverage