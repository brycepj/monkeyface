var i = require('./index');


// interface types and optionals
var iSmello = i.create('iSmello', ['smello', 'world']);

var iLikeType = i.create('iLikeTypes', ['hello:string', 'world?:number', 'smelly:iSmello']);

var likeTypes = {
  hello: "22string",
  world: 1,
  smelly: {
    world: null
  }
};

var think = likeTypes.ensure('iLikeTypes');