var fs = require('fs-extra');
var Promise = require('bluebird');

var logger = module.exports = {};

var log_path = './log.json';


var get = logger.get = (perf_key) => {
  return new Promise((resolve, reject) => {
    fs.readJson(log_path, (err, json) => {
      if (err) reject(err);
      resolve(json);
    });
  });
};

var set = logger.set = (perf_key, results) => {
  return get.then((json) => {
    var parsed = JSON.parse(json);
    // do diffing here?
    parsed[perf_key] = results;
    fs.writeJson(log_path, parsed);
  });
};

