var _ = require('lodash');
var expect = require("chai").expect;
var should = require('chai').should();
var assert = require('assert');
var check = require('../lib/services/typeChecker');
var InterfaceFactory = require('../lib/services/InterfaceFactory');

describe("ensureParams()", function() {
  it("should be a valid method on functions", function() {
    var func = function() {};
    expect(func.ensureParams).to.ok;
    expect(check.discernType(func.ensureParams)).to.equal('function');
  });
  
  it("should return the expected value if params are valid", function() {
    var param1 = 1, param2 = "stringer", param3 = {}, param4 = [];
    var numberReturner = function(val__number, val__string, val__object, val__array) {
      return val__number;
    }; // FIXME: Consider using an activating method, to cut down on call stack
    
    expect(numberReturner.ensureParams(param1, param2, param3, param4)).to.equal(param1);
  });
  
  it("should throw an error if params are invalid", function() {
    // TODO: This should be broken down into more granular tests
    var param1 = 1, param2 = "stringer", param3 = [], param4 = [];
    var numberReturner = function(val__number, val__string, val__object, val__array) {
      return val__number;
    };
    
    expect(numberReturner.ensureParams.bind(param1, param2, param3, param4)).to.throw(Error);
  });
  
  it("should return the expected value if param matches interface", function() {
      const ifaceName = 'supabadintafacetho';
      const props = ['hello:string', 'world:object', 'tho:number'];
      
      InterfaceFactory.createInterface(ifaceName, props);
      
      const val = {
        hello:"hello",
        world: {},
        tho: 1
      };
    
    var numberReturner = function(val__supabadintafacetho) {
      return val__supabadintafacetho;
    };
    
    expect(numberReturner.ensureParams(val)).to.equal(val);
  });
  
    it("should throw an error if param fails to match interface", function() {
      const ifaceName = 'supabadintafacetho';
      const props = ['hello:string', 'world:object', 'tho:number'];
      
      InterfaceFactory.createInterface(ifaceName, props);
      
      // missing hello prop
      const val = {
        world: {},
        tho: 1
      };
    
      var valReturner = function(val__supabadintafacetho) {
        return val__supabadintafacetho;
      };
    
    expect(valReturner.ensureParams.bind(val)).to.throw(Error);
  });
})