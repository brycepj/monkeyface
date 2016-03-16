var env = require('../lib/services/env');
var expect = require("chai").expect;
var should = require('chai').should();
var assert = require('assert');

describe('ENV API', function() {
  
  describe("logLevel", function() {
    it('should be defined', function() {
      should.exist(env.config.logLevel);
    });
    it('should be a string', function() {
      expect(typeof env.config.logLevel).to.equal('string');
    });
    it('should return a valid value', function(){
      var validValues = ['silent', 'warn', 'error'];
      expect(env.config.logLevel).to.be.oneOf(validValues);
    });
  });
  
  describe("registry", function() {
    it('should be defined', function() {
      should.exist(env.config.registry);
    });
    it('should be an object', function() {
      expect(typeof env.config.registry).to.equal('object');
    });
  });
  
  describe("browser", function(){
    it("should be defined", function() {
      should.exist(env.config.browser);
    });
    
    it("should be a boolean", function() {
      expect(typeof env.config.browser).to.equal('boolean');
    });
    
    it("should be true if opened in a browser, and false if run by node", function() {
      const isBrowser = new Function("try {return this===window;}catch(e){ return false;}")() && window;
      if (isBrowser) {
        expect(env.config.browser).to.equal(true);
      } else {
        expect(env.config.browser).to.equal(false);
      }
    })
  });
  
});