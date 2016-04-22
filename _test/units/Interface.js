var expect = require("chai").expect;
var should = require('chai').should();
var assert = require('assert');
var _ = require('lodash');
var i = require("../../index")();
describe("New interface model", function () {
    describe("meta config", function () {
        var iface = i.create("iHello", ["world"]);
        it("should return an interface object", function () {
            expect(iface).to.be.ok;
        });
        it("should have declarations", function () {
            expect(iface.declarations.length).to.be.above(0);
        });
        describe("inferred interfaces", function () {
            var iLodash = i.create('iLodash', _);
            it("should return an interface object", function () {
                expect(iLodash).to.be.ok;
            });
            it("should have declarations", function () {
                expect(iLodash.declarations.length).to.be.above(0);
            });
            it("should validate the object inferred from", function () {
                expect(iLodash.validate(_)).to.equal(true);
            });
            it("should not validate an altered version of the object inferred from", function () {
                var newLodash = _.cloneDeep(_);
                delete newLodash['upperCase'];
                expect(iLodash.validate(newLodash)).to.equal(false);
            });
        });
        describe("different argument passing", function () {
        });
    });
    describe("validation", function () {
        describe("required and optional properties", function () {
            var iface = i.create('iDello', ['world?', 'tho']);
            it("should return false when missing a required property", function () {
                expect(iface.validate({ world: null })).to.equal(false);
            });
            it("should return true when required property is present", function () {
                var val = { tho: null };
                expect(iface.validate(val)).to.equal(true);
            });
            it("should return true when missing an optional property", function () {
                var val = { tho: null };
                expect(iface.validate(val)).to.equal(true);
            });
            it("should return true when optional property is present", function () {
                var val = { world: null, tho: null };
                expect(iface.validate(val)).to.equal(true);
            });
        });
        describe("typechecking", function () {
            describe("interfaces", function () {
            });
            describe("primitives", function () {
                describe("strings", function () {
                    var iString = i.create("iString", ["hello:string"]);
                    it("should return true when the correct type value is passed", function () {
                        var val = { hello: "stringer" };
                        expect(iString.validate(val)).to.equal(true);
                    });
                    it("should return false when the incorrect type value is passed", function () {
                        var val = { hello: null };
                        expect(iString.validate(iString, val)).to.equal(false);
                    });
                });
                describe("objects", function () {
                    var iObject = i.create("iObject", ["hello:object"]);
                    it("should return true when the correct type value is passed", function () {
                        var val = { hello: {} };
                        expect(iObject.validate(val)).to.equal(true);
                    });
                    it("should return false when the incorrect type value is passed", function () {
                        var val = { hello: null };
                        expect(iObject.validate(iObject, val)).to.equal(false);
                    });
                });
                describe("arrays", function () {
                    var iArray = i.create("iArray", ["hello:array"]);
                    it("should return true when the correct type value is passed", function () {
                        var val = { hello: [] };
                        expect(iArray.validate(val)).to.equal(true);
                    });
                    it("should return false when the incorrect type value is passed", function () {
                        var val = { hello: null };
                        expect(iArray.validate(iArray, val)).to.equal(false);
                    });
                });
                describe("numbers", function () {
                    var iNumber = i.create("iNumber", ["hello:number"]);
                    it("should return true when the correct type value is passed", function () {
                        var val = { hello: 111111 };
                        expect(iNumber.validate(val)).to.equal(true);
                    });
                    it("should return false when the incorrect type value is passed", function () {
                        var val = { hello: null };
                        expect(iNumber.validate(iNumber, val)).to.equal(false);
                    });
                });
                describe("dates", function () {
                    var iDate = i.create("iDate", ["hello:date"]);
                    it("should return true when the correct type value is passed", function () {
                        var val = { hello: new Date() };
                        expect(iDate.validate(val)).to.equal(true);
                    });
                    it("should return false when the incorrect type value is passed", function () {
                        var val = { hello: null };
                        expect(iDate.validate(iDate, val)).to.equal(false);
                    });
                });
                describe("errors", function () {
                    var iError = i.create("iError", ["hello:error"]);
                    it("should return true when the correct type value is passed", function () {
                        var val = { hello: new Error() };
                        expect(iError.validate(val)).to.equal(true);
                    });
                    it("should return false when the incorrect type value is passed", function () {
                        var val = { hello: null };
                        expect(iError.validate(iError, val)).to.equal(false);
                    });
                });
            });
            describe("interfaces", function () {
                describe("inferred", function () {
                });
            });
        });
    });
});
