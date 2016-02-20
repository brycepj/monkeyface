module.exports = {
  forIn: forIn,
  times: times
}


function forIn (object, iteratee) {
   for (var key in object) {
      if (object.hasOwnProperty(key)) {
        iteratee(object[key], key);
      }
   }
}

function times(iterations, fn) {
  while (iterations--) {
    fn();
  }
}