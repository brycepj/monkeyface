
var expect = require("chai").expect;
var should = require('chai').should();
var assert = require('assert');
var Instances = require('../../lib/services/Types').Instances;

var _:_.LoDashStatic = require('lodash');
var check = require('../../lib/services/typeChecker');
var i = require('../../index');

describe("typeChecker", () => {
  describe("overview", () => {
    it("should be defined", () => {
      expect(typeof check).to.equal("object");
    });
    it("should give access to methods", () => {
      _.forIn(check, (method, key) => {
        expect(typeof method).to.equal('function');
      });
    });
  });

  describe("general use methods", () => {
    describe("discernType", () => {
      it("should discern all types", () => {
        let iface = i.create('iHello', ['world']);
        let pairings = [['string', 'sample string'], ['array', []], ['object', {}], ['interface', iface],
          ['number', 1], ['date', new Date()], ['error', new Error()], ['boolean', true]];
        _.forEach(pairings, (pairing, idx) => {
          let type = pairing[0];
          let instance = pairing[1];
          expect(check.discernType(instance)).to.equal(type);
        });
      });
    });
  });



  describe("single value checkers", () => {
    it("isArray only passes one value", () => {
      primitiveChecker(check.isArray, []);
    });
    it("isBoolean only passes one value", () => {
      primitiveChecker(check.isBoolean, true);
    });
    it("isObject only passes one value", () => {
      primitiveChecker(check.isObject, {});
    });
    it("isString only passes one value", () => {
      primitiveChecker(check.isString, "sample string");
    });
    it("isNull only passes one value", () => {
      primitiveChecker(check.isNull, null);
    });
    it("isDate only passes one value", () => {
      primitiveChecker(check.isDate, new Date());
    });
    it("isNumber only passes one value", () => {
      primitiveChecker(check.isNumber, 112345);
    });
    it("isError only passes one value", () => {
      primitiveChecker(check.isError, new Error());
    });
    describe("isInterface", () => {
      it("should only pass interfaces", () => {
        let failing = _.filter(Instances, (instance, idx) => {
          return check.isInterface(instance);
        });
        let iface = i.create('iHello', ['world']);
        expect(check.isInterface(iface)).to.equal(true);
        expect(failing.length).to.equal(0);
      });
    })

    function primitiveChecker(method, val) {
      let Instances = require('../../lib/services/Types').Instances;
      let passing = _.filter(Instances, (instance, idx) => { return method(instance) });
      let failing = _.filter(Instances, (instance, idx) => { return !method(instance) });
      let checkedVal = method(val);

      _.forEach(failing, (instance, idx) => {
        expect(method(instance)).to.equal(false);
      });

      expect(passing.length).to.equal(1);
      expect(checkedVal).to.equal(true);
    }
  });
});






