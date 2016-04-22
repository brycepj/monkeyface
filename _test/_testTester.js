var i = require('../index')();

var expect = require("chai").expect;
var should = require('chai').should();
var assert = require('assert');

describe("test integration", () => {
  it("ensure is patched", () => {
    var obj = {};
    expect(obj.$ensure).to.be.ok
    expect(typeof obj.$ensure).to.equal('function');
  });
  
  it("params is patched", () => {
    var obj = () => {};
    expect(obj.$params).to.be.ok
    expect(typeof obj.$params).to.equal('function');
  });
})