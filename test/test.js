require('../index');
var expect = require("chai").expect;
var should = require('chai').should();

var assert = require('assert');

describe('Array', function() {
  it('should have implement method', function() {
    should.exist(new Array().implement);
    expect(typeof new Array().implement).to.equal('function');
  })
});