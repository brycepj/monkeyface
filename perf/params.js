var _ = require('lodash');
var Benchmark = require('benchmark');

module.exports = (() => {

  var paramsSuite = new Benchmark.Suite;
  var i = require('../index')({ env: 'production' });
  var obj = { hello: null, world: null };

  i.create("iHelloWorld", ['hello', 'world']);

  paramsSuite
    .add('params#noParams', () => {
      var fn = () => {
        return true;
      }
      fn();
    })
    .add('params#onePrimitive', () => {
      var fn = (arg$number) => {
        return arg$number;
      };

      fn.$params(1);
    })
    .add('params#oneBasic', () => {
      var fn = (arg$object) => {
        return arg$object;
      };

      fn.$params({});
    })
    .add('params#oneInterface', () => {
      var fn = (arg$iHelloWorld) => {
        return arg$iHelloWorld;
      };

      fn.$params(obj);
    })
    .add('params#oneCollectionPrimitive', () => {
      var fn = (arg$numbers) => {
        return arg$numbers;
      };

      fn.$params([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    })
    .add('params#oneCollectionBasic', () => {
      var fn = (arg$objects) => {
        return arg$objects;
      };

      fn.$params([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
    })
    .add('params#oneCollectionInterface', () => {
      var fn = (arg$iHelloWorld) => {
        return arg$iHelloWorld;
      };

      fn.$params([obj, obj, obj, obj, obj, obj, obj, obj, obj, obj]);
    })
    .add('params#multiple-5-Primitives', () => {
      var fn = (argOne$number, argTwo$number, argThree$number, argFour$number, argFive$number) => {
        return arguments;
      };

      fn.$params(1, 3, 4, 5, 6);
    })
    .add('params#multiple-5-Basic', () => {
      var fn = (argOne$object, argTwo$object, argThree$object, argFour$object, argFive$object) => {
        return arguments;
      };

      fn.$params({}, {}, {}, {}, {});
    })
    .add('params#multiple-5-interface', () => {
      var fn = (argOne$iHelloWorld, argTwo$iHelloWorld, argThree$iHelloWorld, argFour$iHelloWorld, argFive$iHelloWorld) => {
        return arguments;
      };

      fn.$params(obj, obj, obj, obj, obj);
    })
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    .on('complete', function() {
      console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ 'async': false });
})();
