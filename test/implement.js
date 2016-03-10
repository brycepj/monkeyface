var _ = require('lodash');
var expect = require("chai").expect;
var should = require('chai').should();
var assert = require('assert');
var mocks = require('../lib/services/mock');
var check = require('../lib/services/typeChecker');

describe(".implement()", function() {
  
  const types = [ String, Array, Object, Number, Error, Boolean, Date];
  
  it("should exist on all types", function() {
    var checkAll = types.every(function(Native, idx) {
      var instance = new Native();
      return instance.implement;
    }); 
    // to.be.ok == truthy
    expect(checkAll).to.be.ok;
  });
  
  it("should be on a function on all types", function() {
    var checkAll = types.every(function(Native, idx) {
      var instance = new Native();
      return typeof instance.implement === 'function';
    }); 
    // to.be.ok == truthy
    expect(checkAll).to.be.ok;
  });
  
  describe(".implement('string')", function() {
    it("should return <string> when passed a <string>", function() {
      var str = "Hello World";
      expect(str.implement('string')).to.equal(str);
    })
    it("should throw an error when passed anything other than a string", function() {
      var type = 'string';
      var filteredMocks = mocks.Arr.filter(function(mock) {
        return check.isString(mock);
      });
      
      _.forEach(filteredMocks, function(mock) {
        mock = mock.implement.bind(type);
        expect(mock.implement).to.throw(Error);
      })

    })
  });

  describe(".implement('number')", function() {
    it("should return <number> when passed a <number>", function() {
      var num = 1;
      expect(num.implement('number')).to.equal(num);
    })
    it("should throw an error when passed anything other than a number", function() {
      var type = 'number';
      var filteredMocks = mocks.Arr.filter(function(mock) {
        return check.isNumber(mock);
      });
      
      _.forEach(filteredMocks, function(mock) {
        mock = mock.implement.bind(type);
        expect(mock.implement).to.throw(Error);
      })

    })
  });
  
  describe(".implement('object')", function() {
    it("should return <object> when passed a <object>", function() {
      var obj = {};
      expect(obj.implement('object')).to.equal(obj);
    })
    it("should throw an error when passed anything other than a object", function() {
      var type = 'object';
      var filteredMocks = mocks.Arr.filter(function(mock) {
        return !check.isObject(mock);
      });
      
      _.forEach(filteredMocks, function(mock) {
        mock = mock.implement.bind(type);
        expect(mock.implement).to.throw(Error);
      })

    })
  });
  
  describe(".implement('array')", function() {
    it("should return <array> when passed a <array>", function() {
      var arr = [];
      expect(arr.implement('array')).to.equal(arr);
    })
    it("should throw an error when passed anything other than an array", function() {
      var type = 'array';
      var filteredMocks = mocks.Arr.filter(function(mock) {
        return !check.isArray(mock);
      });
      
      _.forEach(filteredMocks, function(mock) {
        mock = mock.implement.bind(type);
        expect(mock.implement).to.throw(Error);
      })

    })
  });
  
    describe(".implement('function')", function() {
      it("should return <function> when passed a <function>", function() {
        var fn = function() {};
        expect(fn.implement('function')).to.equal(fn);
      })
      it("should throw an error when passed anything other than an array", function() {
        var type = 'function';
        var filteredMocks = mocks.Arr.filter(function(mock) {
          return !check.isFunction(mock);
        });
        
        _.forEach(filteredMocks, function(mock) {
          mock = mock.implement.bind(type);
          expect(mock.implement).to.throw(Error);
        })

      })
    });
    
    describe(".implement('error')", function() {
      it("should return <error> when passed an <error>", function() {
        var err = new Error();
        expect(err.implement('error')).to.equal(err);
      })
      it("should throw an error when passed anything other than an array", function() {
        var type = 'error';
        var filteredMocks = mocks.Arr.filter(function(mock) {
          return !check.isError(mock);
        });
        
        _.forEach(filteredMocks, function(mock) {
          mock = mock.implement.bind(type);
          expect(mock.implement).to.throw(Error);
        })

      })
    });
    
    describe(".implement('error')", function() {
      it("should return <error> when passed an <error>", function() {
        var err = new Error();
        expect(err.implement('error')).to.equal(err);
      })
      it("should throw an error when passed anything other than an array", function() {
        var type = 'error';
        var filteredMocks = mocks.Arr.filter(function(mock) {
          return !check.isError(mock);
        });
        
        _.forEach(filteredMocks, function(mock) {
          mock = mock.implement.bind(type);
          expect(mock.implement).to.throw(Error);
        })

      })
    });
    
    describe(".implement('date')", function() {
      it("should return <date> when passed an <date>", function() {
        var date = new Date();
        expect(date.implement('date')).to.equal(date);
      })
      it("should throw an error when passed anything other than an array", function() {
        var type = 'date';
        var filteredMocks = mocks.Arr.filter(function(mock) {
          return !check.isDate(mock);
        });
        
        _.forEach(filteredMocks, function(mock) {
          mock = mock.implement.bind(type);
          expect(mock.implement).to.throw(Error);
        })

      })
    });
    
    describe(".implement('boolean')", function() {
      it("should return <boolean> when passed an <boolean>", function() {
        var bool = true;
        expect(bool.implement('boolean')).to.equal(bool);
      })
      it("should throw an error when passed anything other than an array", function() {
        var type = 'boolean';
        var filteredMocks = mocks.Arr.filter(function(mock) {
          return !check.isBoolean(mock);
        });
        
        _.forEach(filteredMocks, function(mock) {
          mock = mock.implement.bind(type);
          expect(mock.implement).to.throw(Error);
        })

      })
    });
});

