
var expect = require("chai").expect;
var should = require('chai').should();
var assert = require('assert');
import Config = require('../../lib/services/ConfigService');

describe("config service", () => {
  var i = require('../../index');

  describe("setConfig", () => {
    it("should override only set property", () => {
      let key = 'rickyTickyTimtom';
      let defaultAction = 'error';
      let cfg = { paramsKey: key };
      Config.resetDefaults(cfg);
      let newProps = Config.getConfig();
      expect(newProps.paramsKey).to.equal(key);
      expect(newProps.exceptions.action).to.equal(defaultAction);
    });
    it("should override multiple defaults", () => {
      let cfg = {
        ensureKey: 'splack',
        paramsKey: 'splick',

        exceptions: {
          action: 'warn',
          applyMiddleware: [() => { }],
          handler: () => { }
        }
      };
      Config.resetDefaults(cfg);
      let newProps = Config.getConfig();
      console.log(cfg, newProps);
      expect(Object.keys(newProps)).to.equal(Object.keys(cfg));
    });
  });

  describe("getConfig", () => {
    it("should", () => {
      expect(typeof {}).to.equal("object");
    });
  });

  describe("applyMiddleware", () => {
    it("should", () => {
      expect(typeof {}).to.equal("object");
    });
  });

  describe("applyHandler", () => {
    it("should", () => {
      expect(typeof {}).to.equal("object");
    });
  });

  describe("setConfig", () => {
    it("should", () => {
      expect(typeof {}).to.equal("object");
    });
  });

  describe("setConfig", () => {
    it("should", () => {
      expect(typeof {}).to.equal("object");
    });

    describe("getters", () => {
      describe("ensureKey", () => {

      });
      describe("paramsKey", () => {

      });
      describe("handler", () => {

      });
      describe("action", () => {

      });
      describe("middleware", () => {

      });
    });
  });

});