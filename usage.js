/*
MAIN.js
*/

var i = require('monkeyface');

// i.create() is shorthand for create, register, and return the interface
var iHello = i.create(['hello', 'world']); // optional name
var iHello = i.create('newiface', ['hello', 'world'])

var crazyObj = {
  hello: null,
  world: null
}

function crazyObjReturner(){
  return iHello.ensure(crazyObj); // returns obj, or throws error if it doesn't match
}

// attach to native Object
i.create('iSmello', ['smello','world']);

var smellyObj = {
  smello: null,
  world: null
}

function smellyObjReturner(params) {
  return smellyObj.ensure('iSmello');
}

// typechecking

var initialVal = 1;
var numba = initialVal.ensure('number');
var stringa = initialVal.ensure('string');
var objecta = initialVal.ensure('object');
var arrainmaka = initialVal.ensure('array');
var erra = initialVal.ensure('error');
var dater = initialVal.ensure('date');
var functa = initialVal.ensure('function');

// collections

function pushEmAll(){
  var storer = [];
  [{smello: null, world: null}].forEach(function(val, key){
    storer.push(val);
  });
  return storer.ensure('[iSmello]');
  // return storer.ensure('[string]');
  // return storer.ensure('[<any_type>]');
}

// interface config

i.register('iNoNulls', ['hello', 'world'], {noNulls:true});

var helloWorldian = {
  hello: "stringer",
  world: "dinger"
}.ensure('iNoNulls');
  
  
// interface types and optionals

i.register('iLikeTypes', ['hello:string', 'world?:number', 'smelly:iSmello']);

var likeTypes = {
  hello: "22string",
  world: 1,
  smelly: {
    smello: null,
    world: null
  }
}.ensure('iLikeTypes');

// Warning: Do not use with something that should be able to fail gracefully without catching the error


// pass types

i.register('iJquery', $);
var hopefullyJQuery = null;
var randoVal = hopefullyjQuery.ensure(iJquery);

i.register('iJquery', $, {strict: true}); // discern types and ensure each prop type
var hopefullyJQuery = null;
var randoVal = hopefullyjQuery.ensure(iJquery);

// function param checking

function giveMeTheRightStuff(sweetJqueryParam__iJQuery, sweetNumber__number){
  // do wtf you want
}

giveMeTheRightStuff.params($, 111);