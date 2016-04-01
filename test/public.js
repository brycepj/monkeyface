beforeEach(function () {
});
var expect = require("chai").expect;
var should = require('chai').should();
var assert = require('assert');
var TypesService = require('../lib/services/Types');
var Names = TypesService.Names;
var Instances = TypesService.Instances;
describe("public api", function () {
    describe("create interface", function () {
        it("should return an interface", function () {
            var monkeyface = require('../index');
            var iTestInterface = monkeyface.create('iTestInterface', ['hello', 'world']);
            expect(iTestInterface).to.be.ok;
            expect(iTestInterface.declarations).to.be.ok;
        });
    });
    describe("register interface", function () {
        it("should add getable interface to the registry", function () {
            var monkeyface = require('../index');
            monkeyface.register('iTestInterface', ['hello', 'world']);
            var iTestInterface = monkeyface.get('iTestInterface');
            expect(iTestInterface).to.be.ok;
            expect(iTestInterface.declarations).to.be.ok;
        });
    });
    describe("$ensure", function () {
        it("should successfully return passing values for all types", function () {
            require('../index');
            var passes = Instances.every(function (instance, idx) {
                return instance.$ensure(Names[idx]) === instance;
            });
            expect(passes).to.be.ok;
        });
        it("should throw errors when invalid values returned", function () {
            Instances.forEach(function (instance, idx) {
                var fn = instance.$ensure.bind(Names[idx + 1]);
                expect(fn).to.throw(Error);
            });
        });
    });
    describe("$params", function () {
        it("should successfully execute function when valid params are passed", function () {
            var val = true;
            function basicFunction(param1__number, param2__string, param3__date) {
                return val;
            }
            expect(basicFunction.$params(1, 'stringer', new Date())).to.equal(val);
        });
        it("should throw errors when invalid params are passed", function () {
            function basicFunction(param1__number, param2__string, param3__date) {
                return val;
            }
            var fn = basicFunction.bind('stringer', new Date(), 1);
            expect(fn).to.throw(Error);
        });
    });
});
//# sourceMappingURL=public.js.map