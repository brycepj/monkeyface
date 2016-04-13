var _ = require('lodash');
var expect = require("chai").expect;
var should = require('chai').should();
var assert = require('assert');

var i = require('../../index');

var iLodash = i.create('iLodash', _);
var iSnarley = i.create('iSnarley', ['snarley:string']);
var iBarley = i.create('iBarley', ['gnarley:iSnarley', 'name:number']);
var iCarley = i.create('iCarley', ['numba:number', 'barley:iBarley']);
var iGnarley = i.create('iGnarley', [
  'hello:string', 'world:number',
  'date:date', 'err:error',
  'snarley:iSnarley', 'snarlies:iSnarley[]',
  'optional?:array', 'gnarlies?:iGnarley[]',
  'nested:iBarley', 'config:object',
  'random', 'cachedLodash:iLodash',
  'soDeepThough:iCarley' // has 3 interfaces deep
]);
var config = {
  random: "mandom"
};

var optional = [];
var snarley = {
  snarley:'strings'
};

var barley = {
  gnarley: snarley,
  name: 12345
}; 

var carley = {
  barley:barley,
  numba: 12345
};


var correctGnarley = {
  hello: "string",
  world: 1234,
  date: new Date(),
  err: new Error(),
  random: "randomString",
  config: {},
  cachedLodash: _,
  optional: [], 
  snarly: snarley,
  snarlies: [snarley, snarley],
  nested: barley,
  soDeepThough:carley
}

describe("$ensure", () => {
  it("should pass a correct interface", () => {
    console.log("correct", correctGnarley);

    var obj = correctGnarley.$ensure('iGnarley');

    
    expect(obj).to.equal(obj);
  });
});






// Collection

// $ensure

// $params


