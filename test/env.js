var env = require('../lib/services/env');
var expect = require("chai").expect;
var should = require('chai').should();
var assert = require('assert');

describe('ENV API', function() {
  
  describe("logLevel", function() {
    it('should be defined', function() {
      should.exist(env.logLevel);
    });
    it('should be a string', function() {
      expect(typeof env.logLevel).to.equal('string');
    });
    it('should return a valid value', function(){
      var validValues = ['silent', 'warn', 'error'];
      expect(env.logLevel).to.be.oneOf(validValues);
    });
  });
  
  describe("registry", function() {
    it('should be defined', function() {
      should.exist(env.registry);
    });
    it('should be an object', function() {
      expect(typeof env.registry).to.equal('object');
    });
  });
  
  describe("globalObject", function() {
    it('should be defined', function() {
      should.exist(env.globalObject);
    });
    it('should be an object', function() {
      expect(typeof env.globalObject).to.equal('object');
    });
  });
});