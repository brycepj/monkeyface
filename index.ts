/// <reference path="typings/main.d.ts" />

declare var $require: any;

global["$require"] = function(name:string){
  return require(__dirname + '/lib/' + name);
};

exports = $require('api/public');