
global.$require = function(name){
	return require(__dirname + '/lib/' + name);
};

module.exports = (function(){
	require('./lib/patcher');
})();