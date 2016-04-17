export = (() => {

// includes
if (!String.prototype.includes) {
  String.prototype.includes = function(search, start):boolean {
    if (typeof start !== 'number') {
      start = 0;
    }
    
    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

})();