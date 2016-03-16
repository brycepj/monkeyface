global.$require = function(name){
  return require(__dirname + '/lib/' + name);
};

exports = $require('api/public');