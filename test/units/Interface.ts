
var expect = require("chai").expect;
var should = require('chai').should();
var assert = require('assert');
var _:_.LoDashStatic = require('lodash');

var i = require("../../index");

describe("New interface model", () => {
  describe("meta config", () => {
    let iface = i.create("iHello", ["world"]);
    it("should return an interface object", () => {
      expect(iface).to.be.ok;
    });

    it("should have declarations", () => {
      expect(iface.declarations.length).to.be.above(0);
    });

    describe("inferred interfaces", () => {
      let iLodash = i.create('iLodash', _);

      it("should return an interface object", () => {
        expect(iLodash).to.be.ok;
      });

      it("should have declarations", () => {
        expect(iLodash.declarations.length).to.be.above(0);
      });

      it("should validate the object inferred from", () => {
        expect(iLodash.validate(_)).to.equal(true);
      });
      it("should not validate an altered version of the object inferred from", () => {
        var newLodash:any = _.cloneDeep(_);
        newLodash['add'] = 11;
        expect(iLodash.validate(_)).to.equal(false);
      })
    });
    describe("different argument passing", () => {

    });
  });
  describe("validation", () => {
    describe("required and optional properties", () => {
      let iface = i.create('iDello', ['world?', 'tho']);

      it("should return false when missing a required property", () => {
        expect(iface.validate({ world: null })).to.equal(false);
      });
      it("should return true when required property is present", () => {
        let val = { tho: null };
        expect(iface.validate(val)).to.equal(true);
      });
      it("should return true when missing an optional property", () => {
        let val = { tho: null };
        expect(iface.validate(val)).to.equal(true);
      });
      it("should return true when optional property is present", () => {
        let val = { world: null, tho: null };
        expect(iface.validate(val)).to.equal(true);
      });
    });
    describe("typechecking", () => {
      describe("interfaces", () => {

      });
      describe("primitives", () => {
        describe("strings", () => {
          let iString = i.create("iString", ["hello:string"]);
          it("should return true when the correct type value is passed", () => {
            let val = { hello: "stringer" };
            expect(iString.validate(val)).to.equal(true);
          });
          it("should return false when the incorrect type value is passed", () => {
            let val = { hello: null };
            expect(iString.validate(iString, val)).to.equal(false);
          });
        });
        describe("objects", () => {
          let iObject = i.create("iObject", ["hello:object"]);
          it("should return true when the correct type value is passed", () => {
            let val = { hello: {} };
            expect(iObject.validate(val)).to.equal(true);
          });
          it("should return false when the incorrect type value is passed", () => {
            let val = { hello: null };
            expect(iObject.validate(iObject, val)).to.equal(false);
          });
        });
        describe("arrays", () => {
          let iArray = i.create("iArray", ["hello:array"]);
          it("should return true when the correct type value is passed", () => {
            let val = { hello: [] };
            expect(iArray.validate(val)).to.equal(true);
          });
          it("should return false when the incorrect type value is passed", () => {
            let val = { hello: null };
            expect(iArray.validate(iArray, val)).to.equal(false);
          });
        });
        describe("numbers", () => {
          let iNumber = i.create("iNumber", ["hello:number"]);
          it("should return true when the correct type value is passed", () => {
            let val = { hello: 111111 };
            expect(iNumber.validate(val)).to.equal(true);
          });
          it("should return false when the incorrect type value is passed", () => {
            let val = { hello: null };
            expect(iNumber.validate(iNumber, val)).to.equal(false);
          });
        });
        describe("dates", () => {
          let iDate = i.create("iDate", ["hello:date"]);
          it("should return true when the correct type value is passed", () => {
            let val = { hello: new Date() };
            expect(iDate.validate(val)).to.equal(true);
          });
          it("should return false when the incorrect type value is passed", () => {
            let val = { hello: null };
            expect(iDate.validate(iDate, val)).to.equal(false);
          });
        });
        describe("errors", () => {
          let iError = i.create("iError", ["hello:error"]);
          it("should return true when the correct type value is passed", () => {
            let val = { hello: new Error() };
            expect(iError.validate(val)).to.equal(true);
          });
          it("should return false when the incorrect type value is passed", () => {
            let val = { hello: null };
            expect(iError.validate(iError, val)).to.equal(false);
          });
        });
      });
      describe("interfaces", () => {
        describe("inferred", () => {

        });

      });
    })
  });
});