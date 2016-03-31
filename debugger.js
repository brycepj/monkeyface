var i = require('./index');
var $ = require('lodash');

// pass types

var iJquery = i.create('iJquery', $, {strict: true}); // discern types and ensure each prop type
var hopefullyJQuery = $;
var randoVal = hopefullyJQuery.ensure('iJquery');

// function param checking

function giveMeTheRightStuff(sweetJqueryParam__iJquery, sweetNumber__string){
  // do wtf you want
  console.log('do wtf you want', typeof sweetJqueryParam__iJquery.add, sweetNumber__number);
}

giveMeTheRightStuff.params($, 111);