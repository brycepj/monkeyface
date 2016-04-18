var _ = require('lodash');
var expect = require("chai").expect;
var should = require('chai').should();
var assert = require('assert');
var u = require('../../lib/services/utils');
var i = require('../../index')();

var iLodash = i.create('iLodash', _);
var iLowLevel = i.create('iLowLevel', ['lowest:string', 'thing?:number', 'lodash:iLodash', 'numbaz:number[]']);
var iMidLevel = i.create('iMidLevel', ['low:iLowLevel', 'lows:iLowLevel[]', 'config:object', 'listy:array'])
var iHighLevel = i.create('iHighLevel', ['mid:iMidLevel', 'err:error', 'date:date']);

var pureObj = {
  mid: {
    config: {},
    listy: [],
    low: {
      lodash: _,
      thing: 12345, // switch to test optional
      lowest: 'stringy',
      numbaz: [12, 34, 56]
    },
    lows: [{
      lodash: _,
      thing: 12345, // switch to test optional
      lowest: 'stringy',
      numbaz: [12, 34, 56]
    }],
    name: "mynametho"
  },
  kingdom: 12345,
  err: new Error(),
  date: new Date()
};

var pureIfaceKey = 'iHighLevel';

describe("$ensure", () => {
  describe("complex interface", () => {
    it("should pass the perfect object", () => {
      var alteredObj = u.valChanger(pureObj);
      expect(alteredObj.$ensure(pureIfaceKey)).to.equal(alteredObj);
    });
    it("should fail when an optional property receives the wrong type", () => {
      var alteredObj = u.valChanger(pureObj, 'mid.low.thing', '12345');
      expect(alteredObj.$ensure.bind(pureIfaceKey)).to.throw(Error);
    });
    it("should fail when a collection expects an interface to be enforced that isn't", () => {
      var alteredObj = u.valChanger(pureObj, 'mid.lows.lodash', null);
      expect(alteredObj.$ensure.bind(pureIfaceKey)).to.throw(Error);
    });
    it("should fail when a collection expects an plain type to be enforced that isn't", () => {
      var alteredObj = u.valChanger(pureObj, 'mid.low.numbaz[1]', 'astring');
      expect(alteredObj.$ensure.bind(pureIfaceKey)).to.throw(Error);
    });
    it("should fail when a collection is empty", () => {
      var alteredObj = u.valChanger(pureObj, 'mid.low.numbaz', []);
      expect(alteredObj.$ensure.bind(pureIfaceKey)).to.throw(Error);
    });
  });

  describe("basic types", () => {
    var Names = require('../../lib/services/Types').Names;
    var Instances = require('../../lib/services/Types').Instances;
    it("should pass and return all correctly passed basic types", () => {
      Instances.forEach((instance, idx) => {
        var returnVal = instance.$ensure(Names[idx]);
        expect(returnVal).to.equal(instance);
      });
    });

    it("should fail all other types passed it", () => {
      Instances.forEach((instance, instanceIdx) => {
        Names.forEach((name, nameIdx) => {
          if (nameIdx === instanceIdx) {
            var fn = instance.$ensure.bind(name);
            expect(fn).to.throw(Error);
          }
        });
      });
    });
  });

});
