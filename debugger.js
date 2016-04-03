var i = require('./index');


var iHello = i.create('iHello', ['world:string', 'otherprop:number']);
var iSecondLevel = i.create('iSecondLevel', ['second:iHello', 'secondsecond']);
var iThirdLevel = i.create('iThirdLevel', ['third:iSecondLevel']);


var obj = {
  second: {
    world:'stirng',
    // otherprop:111
  },
  secondsecond: null
};

// should not be an error
obj.$ensure('iSecondLevel');
// obj.$ensure('iThirdLevel');