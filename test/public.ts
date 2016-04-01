/// <reference path="../typings/main.d.ts" />

beforeEach(() => {

});

const expect = require("chai").expect;
const should = require('chai').should();
const assert = require('assert');

const TypesService = require('../lib/services/Types');
const Names = TypesService.Names;
const Instances = TypesService.Instances;

describe("public api", () => {
  describe("create interface", () => {
    it("should return an interface", () => {
      let monkeyface = require('../index');
      let iTestInterface = monkeyface.create('iTestInterface', ['hello', 'world']);
      expect(iTestInterface).to.be.ok;
      expect(iTestInterface.declarations).to.be.ok;
    });
  });
  describe("register interface", () => {
    it("should add getable interface to the registry", () => {
      let monkeyface = require('../index');
      monkeyface.register('iTestInterface', ['hello', 'world']);
      let iTestInterface = monkeyface.get('iTestInterface');
      expect(iTestInterface).to.be.ok;
      expect(iTestInterface.declarations).to.be.ok;
    });
  });
  describe("$ensure", () => {
    it("should successfully return passing values for all types", () => {
      require('../index');
      let passes = Instances.every((instance, idx) => {
        return instance.$ensure(Names[idx]) === instance;
      });

      expect(passes).to.be.ok;
    });

    it("should throw errors when invalid values returned", () => {
      Instances.forEach((instance, idx) => {
        let fn = instance.$ensure.bind(Names[idx + 1]);
        expect(fn).to.throw(Error);
      });
    })
  });

  describe("$params", () => {
    it("should successfully execute function when valid params are passed", () => {
      let val = true;
      function basicFunction(param1__number, param2__string, param3__date) {
        return val;
      }

      expect(basicFunction.$params(1, 'stringer', new Date())).to.equal(val);
    });

    it("should throw errors when invalid params are passed", () => {
      function basicFunction(param1__number, param2__string, param3__date) {
        return val;
      }
      let fn = basicFunction.bind('stringer', new Date(), 1);
      expect(fn).to.throw(Error);
    })
  })
});