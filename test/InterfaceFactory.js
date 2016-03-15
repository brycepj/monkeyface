var _ = require('lodash');
var expect = require("chai").expect;
var should = require('chai').should();
var assert = require('assert');
var mocks = require('../lib/services/mock');
var check = require('../lib/services/typeChecker');
var InterfaceFactory = require('../lib/services/InterfaceFactory');
var env = require('../lib/services/env');

describe("Interface Factory", function(){
  describe("createInterface()", function () {
    it("should be a defined method", function() {
      expect(InterfaceFactory.createInterface).to.be.ok;
      expect(typeof InterfaceFactory.createInterface).to.equal('function');
    });
    
    it("should return a valid interface object", function() {
      const ifaceName = 'supabadintafacetho';
      const props = ['hello', 'world', 'tho'];
      const iface = InterfaceFactory.createInterface(ifaceName, props);
      
      expect(iface.declarations).to.be.ok;
      expect(iface.declarations.length).to.equal(props.length);
      expect(iface.name).to.be.ok;
      expect(iface.name).to.equal(ifaceName);
      expect(iface.validate).to.be.ok;
    });
    
    it("should add the interface to the registry", function() {
      const ifaceName = 'supabadintafacetho';
      const props = ['hello', 'world', 'tho'];
      const iface = InterfaceFactory.createInterface(ifaceName, props);
      var interfaceRegistry = env.svc.__interfaces;
      expect(interfaceRegistry).to.be.ok;
      expect(interfaceRegistry[ifaceName]).to.be.ok;
    });
  });
  
  describe("ensureImplements()", function() {
    it("should be a valid static method", function() {
       const factory = InterfaceFactory;
       expect(factory.ensureImplements).to.be.ok;
    });
    
    it("should return the validated object", function() {
      const ifaceName = 'supabadintafacetho';
      const props = ['hello', 'world', 'tho'];
      const iface = InterfaceFactory.createInterface(ifaceName, props);
      const val = {
        hello:"hello",
        world: "world",
        tho: "tho"
      };
      var returnVal = InterfaceFactory.ensureImplements(val, iface);
      expect(returnVal).to.equal(val);
    });
    
    it("should throw an error when missing a property", function() {
      // TODO: You need to expand this significantly with required props, optional props, types etc
      const ifaceName = 'supabadintafacetho';
      const props = ['hello', 'world', 'tho'];
      const iface = InterfaceFactory.createInterface(ifaceName, props);
      const val = {
        hello:"hello"
      };
      var fn = InterfaceFactory.ensureImplements.bind(val, iface);
      expect(fn).to.throw(Error);
    });
    
    it("should return the validated object when missing an optional property", function() {
      const ifaceName = 'supabadintafacetho';
      const props = ['hello', 'world?', 'tho?'];
      const iface = InterfaceFactory.createInterface(ifaceName, props);
      const val = {
        hello:"hello"
      };
      var validated = InterfaceFactory.ensureImplements(val, iface);
      expect(validated).to.equal(val);
    });
    
    it("should return the validated object when types pass", function() {
      const ifaceName = 'supabadintafacetho';
      const props = ['hello:string', 'world:number', 'tho:array', 'checkme:date', 
      'robject:object', 'shmerror:error'];
      const iface = InterfaceFactory.createInterface(ifaceName, props);
      const val = {
        hello:"hello",
        world: 1,
        tho: [],
        checkme: new Date(),
        robject: {},
        shmerror: new Error()
      };
      var validated = InterfaceFactory.ensureImplements(val, iface);
      expect(validated).to.equal(val);
    });  
    
    it("should throw an error when bad types are passed", function() {
      // make this better -- you shouldn't have to test this, if you test the typechecker
      const ifaceName = 'supabadintafacetho';
      const props = ['hello:string', 'world:number', 'tho:array', 'checkme:date', 
      'robject:object', 'shmerror:error'];
      const iface = InterfaceFactory.createInterface(ifaceName, props);
      const val = {
        hello: 1,
        world: 1,
        tho: 1,
        checkme: 1,
        robject: 1,
        shmerror: 1
      };
      var validated = InterfaceFactory.ensureImplements.bind(val, iface);
      expect(validated).to.throw(Error);
    });  
    
  });  
});
