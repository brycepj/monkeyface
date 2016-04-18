var path = require('path');
var Promise = require('bluebird');
// var params = require('./params');
// var ensure = require('./ensure');

var keys = ['ensure', 'params'];
var key_base = './keys';

// api for gulp

function runAll() {
  var suitePromises = [];
  
  keys.forEach((key, idx) => {
    var module_path = path.join(key_base, key);
    suitePromises.push(runSingle(module_path));
  });
  return Promise.all(suitePromises);
}

function runSingle(module_path) {
  return require(module_path);
}



module.exports = {
  logAll: logAll,
  logSingle: logSingle
};