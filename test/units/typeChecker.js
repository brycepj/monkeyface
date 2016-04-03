"use strict";
var expect = require("chai").expect;
var should = require('chai').should();
var assert = require('assert');
var Instances = require('../../lib/services/Types').Instances;
var _ = require('lodash');
var check = require('../../lib/services/typeChecker');
var i = require('../../index');
describe("typeChecker", function () {
    describe("overview", function () {
        it("should be defined", function () {
            expect(typeof check).to.equal("object");
        });
        it("should give access to methods", function () {
            _.forIn(check, function (method, key) {
                expect(typeof method).to.equal('function');
            });
        });
    });
    describe("general use methods", function () {
        describe("discernType", function () {
            it("should discern all types", function () {
                var iface = i.create('iHello', ['world']);
                var pairings = [['string', 'sample string'], ['array', []], ['object', {}], ['interface', iface],
                    ['number', 1], ['date', new Date()], ['error', new Error()], ['boolean', true]];
                _.forEach(pairings, function (pairing, idx) {
                    var type = pairing[0];
                    var instance = pairing[1];
                    expect(check.discernType(instance)).to.equal(type);
                });
            });
        });
    });
    describe("isInterface", function () {
        it("should only pass interfaces", function () {
            var failing = _.filter(Instances, function (instance, idx) {
                return check.isInterface(instance);
            });
            var iface = i.create('iHello', ['world']);
            expect(check.isInterface(iface)).to.equal(true);
            expect(failing.length).to.equal(0);
        });
    });
    describe("single value checkers", function () {
        it("isArray only passes one value", function () {
            primitiveChecker(check.isArray, []);
        });
        it("isBoolean only passes one value", function () {
            primitiveChecker(check.isBoolean, true);
        });
        it("isObject only passes one value", function () {
            primitiveChecker(check.isObject, {});
        });
        it("isString only passes one value", function () {
            primitiveChecker(check.isString, "sample string");
        });
        it("isNull only passes one value", function () {
            primitiveChecker(check.isNull, null);
        });
        it("isDate only passes one value", function () {
            primitiveChecker(check.isDate, new Date());
        });
        it("isNumber only passes one value", function () {
            primitiveChecker(check.isNumber, 112345);
        });
        it("isError only passes one value", function () {
            primitiveChecker(check.isError, new Error());
        });
        function primitiveChecker(method, val) {
            var Instances = require('../../lib/services/Types').Instances;
            var passing = _.filter(Instances, function (instance, idx) { return method(instance); });
            var failing = _.filter(Instances, function (instance, idx) { return !method(instance); });
            var checkedVal = method(val);
            _.forEach(failing, function (instance, idx) {
                expect(method(instance)).to.equal(false);
            });
            expect(passing.length).to.equal(1);
            expect(checkedVal).to.equal(true);
        }
    });
});
//# sourceMappingURL=typeChecker.js.map