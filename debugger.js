var i = require('./index');


// interface types and optionals

i.register('iLikeTypes', ['hello:string', 'world?:number', 'smelly:iSmello']);

var likeTypes = {
  hello: "22string",
  // world: 1,
  smelly: {
    smello: null,
    world: null
  }
}.ensure('iLikeTypes');