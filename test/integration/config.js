var _ = require('lodash');
var expect = require("chai").expect;
var should = require('chai').should();
var assert = require('assert');
var Types = require('../../lib/services/Types');

var instances = Types.Instances;

var newEnsureKey = '$blendsure';
var newParamsKey = '$sparams';

var i = require('../../index')({
  ensure: {
    key: newEnsureKey
  },
  params: {
    key: newParamsKey
  }
});

describe("config", () => {
  describe("keys", () => {
    it("should properly set a new ensure method on all types", () => {
      instances.forEach((instance, idx) => {
        expect(instance[newEnsureKey]).to.be.ok;
        expect(typeof instance[newEnsureKey]).to.equal('function');
      });
    });
    it("should properly set a new params method on all types", () => {
      var noop = () => { };
      expect(noop[newParamsKey]).to.be.ok;
      expect(typeof noop[newParamsKey]).to.equal('function');
    });
  });
});
