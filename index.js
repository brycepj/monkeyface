module.exports = (function(){
  console.log("executed");
  global.$require = function(name){
    return require(__dirname + '/lib/' + name);
  };
	require('./lib/patcher');
})();