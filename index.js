module.exports = function(cfg){
  global.$require = function(name){
    return require(__dirname + '/lib/' + name);
  };
  $require('services/env').config(cfg);
	require('./lib/patcher');
};