var _ = require('lodash');
var Benchmark = require('benchmark');

var ensureSuite = new Benchmark.Suite;
var i = require('../index')();
var obj = { hello: null, world: null };

i.create("iHelloWorld", ['hello', 'world']);

ensureSuite
  .add('ensure#iHelloWorld', function() {
    var robj = obj.$ensure('iHelloWorld');
  })
  .add('ensure#noEnsure', function() {
    var robj = obj;
  })
  .add('ensure#basicType', () => {
    var robj = obj.$ensure('object');
  })
  .add('ensure#primitive', () => {
    var num = 1;
    num = num.$ensure('number');
  })
  .add('ensure#lodashPrimitive', () => {
    var num = _.isNumber(1);
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ 'async': false });

