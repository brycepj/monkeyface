import maybeThrow = require('../../lib/services/maybeThrow');

var expect = require("chai").expect;
var should = require('chai').should();
var assert = require('assert');

describe("maybeThrow", () => {
  it("is a valid a method", () => {
    expect(maybeThrow).to.be.ok;
  });
  it("should throw an error when false is passed", () => {
    let fn = maybeThrow.bind(null, false, 'string', 'stringer');
    expect(fn).to.throw(Error);
  });
  it("should throw an error when true is passed", () => {
    let fn = maybeThrow.bind(null, true, 'string', 'stringer');
    expect(fn()).to.equal(true);
  });
})

