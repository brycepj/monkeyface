var _ = require('lodash');
var expect = require("chai").expect;
var should = require('chai').should();
var assert = require('assert');
var i = require('../../index')();
var iHelloWorld = i.create('iHelloWorld', ['hello', 'world']);
var aReallyPickyFunction = function (someVal$number, someObj$object, someArr$array, someDate$date, someErr$error, someStr$string) {
    return true;
};
describe("params", function () {
    it("should pass correct signature with basic types", function () {
        var fn = aReallyPickyFunction.$params(1, { hello: 'this', world: 'that' }, [123], new Date(), new Error(), 'stringer');
        expect(fn).to.equal(true);
    });
    it("should fail errors in basic types", function () {
        var fnNum = aReallyPickyFunction.$params.bind(aReallyPickyFunction, '', { hello: 'this', world: 'that' }, [123], new Date(), new Error(), 'stringer');
        expect(fnNum).to.throw(Error);
        var fnObj = aReallyPickyFunction.$params.bind(aReallyPickyFunction, 1, '', [123], new Date(), new Error(), 'stringer');
        expect(fnObj).to.throw(Error);
        var fnArr = aReallyPickyFunction.$params.bind(aReallyPickyFunction, 1, { hello: 'this', world: 'that' }, '', new Date(), new Error(), 'stringer');
        expect(fnArr).to.throw(Error);
        var fnDate = aReallyPickyFunction.$params.bind(aReallyPickyFunction, 1, { hello: 'this', world: 'that' }, [123], '', new Error(), 'stringer');
        expect(fnDate).to.throw(Error);
        var fnErr = aReallyPickyFunction.$params.bind(aReallyPickyFunction, 1, { hello: 'this', world: 'that' }, [123], new Date(), '', 'stringer');
        expect(fnErr).to.throw(Error);
        var fnStr = aReallyPickyFunction.$params.bind(aReallyPickyFunction, 1, { hello: 'this', world: 'that' }, [123], new Date(), new Error(), 1);
        expect(fnStr).to.throw(Error);
    });
    var basicCollectionProcessor = function (coll$numbers) {
        return coll$numbers;
    };
    it("should pass properly passed basic collections", function () {
        var arg = [1, 2, 3, 4];
        var fn = basicCollectionProcessor.$params(arg);
        expect(fn).to.equal(arg);
    });
    it("should fail improperly passed basic collections", function () {
        var arg = [1, 'string'];
        var fn = basicCollectionProcessor.$params.bind(arg);
        expect(fn).to.throw(Error);
    });
    var basicInterfaceProcessor = function (obj$iHelloWorld) {
        return obj$iHelloWorld;
    };
    it("should pass properly passed interfaces", function () {
        var arg = { hello: 'this', world: 'that' };
        var fn = basicInterfaceProcessor.$params(arg);
        expect(fn).to.equal(arg);
    });
    it("should fail improperly passed interfaces", function () {
        var arg = { smello: 'string', world: 'string' };
        var fn = basicInterfaceProcessor.$params.bind(arg);
        expect(fn).to.throw(Error);
    });
    var basicInterfaceCollectionProcessor = function (iColl$iHelloWorlds) {
        return iColl$iHelloWorlds;
    };
    it("should pass properly passed interface collections", function () {
        var arg = [{ hello: 'this', world: 'that' }];
        var fn = basicInterfaceCollectionProcessor.$params(arg);
        expect(fn).to.equal(arg);
    });
    it("should fail improperly passed interfaces collections", function () {
        var arg = [{ smello: 'string', world: 'string' }];
        var fn = basicInterfaceCollectionProcessor.$params.bind(arg);
        expect(fn).to.throw(Error);
    });
});
var gotHelloWorld = i.get('iHelloWorld');
