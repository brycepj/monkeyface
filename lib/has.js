var err_action = 'warn'; // or throw or log


function arrHas (type) {
   var passes;
   if (type == 'string') {
    passes = this.every(function(val){
      return typeof val == 'string';
    }) || this.length == 0;
   }
   if (passes) {
    console.log("Expected type: arr of ", type, "Passed", this);
    return this;
   } else {
    return maybeThrow(passes, type, this);
   }
}

module.exports = arrHas;