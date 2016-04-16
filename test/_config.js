var _ = require('lodash');
var expect = require("chai").expect;
var should = require('chai').should();
var assert = require('assert');
var Types = require('../lib/services/Types');
var instances = Types.Instances;

var newEnsureKey = '$blendsure';
var newParamsKey = '$sparams';

var i = require('../index')({
  ensure: {
    key: newEnsureKey
  },
  params: {
    key: newParamsKey
  },
  exceptions: {
    middleware: [middleWareOne, middleWareTwo],
  }
});

var Bridge = require('../lib/services/BridgeService');
var Config = require('../lib/services/ConfigService');

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
    it("should properly apply multiple error handling middleware", () => {
      Config.setMiddleware([middleWareOne, middleWareTwo]);

      var obj = {};
      var iJelloWorld = i.create('iJelloWorld', ['jello', 'world']);

      try {
        obj[newEnsureKey]('iJelloWorld');
      } catch (error) {
        // error = JSON.stringify(error);
        var mwOneApplied = error.message.indexOf(middleWareOneKey) > -1
        var mwTwoApplied = error.message.indexOf(middleWareTwoKey) > -1;
        expect(mwTwoApplied).to.equal(true);
        expect(mwOneApplied).to.equal(true)
      }
    });
    it("should properly apply a single middleware function", () => {
      var addedKey = 'singleMiddleware'
      var fn = (error) => {
        error.message += addedKey;
        return error;
      }

      Config.setMiddleware(fn);

      var obj = {};
      var iJelloWorld = i.create('iRelloWorld', ['rello', 'world']);

      try {
        obj[newEnsureKey]('iRelloWorld');
      } catch (error) {
        // console.log('error type', typeof error);
        var mwApplied = error.message.indexOf(addedKey) > -1;
        expect(mwApplied).to.equal(true);
      }
    });
    it("should properly divert to a custom handler", () => {
      Config.setHandler(customHandler);
      var addedKey = 'customHandler';
      var obj = {};
      var iTrelloWorld = i.create('iTrelloWorld', ['trello', 'world']);

      try {
        obj[newEnsureKey]('iTrelloWorld');
      } catch (error) {
        var mwApplied = error.message.indexOf(addedKey) > -1;
        expect(mwApplied).to.equal(true);
      }
    });
  });
});

var middleWareOneKey = 'middleWareOne';
function middleWareOne(error) {
  error.message += middleWareOneKey;
  return error;
}

var middleWareTwoKey = 'middleWareTwo';
function middleWareTwo(error) {
  error.message += middleWareTwoKey;
  return error;
}

var customHandler = function(error) {
  error.message += 'customHandler';
  throw Error(JSON.stringify(error, null, 2));
}