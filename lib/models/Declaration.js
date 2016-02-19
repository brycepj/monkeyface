var Declaration = (function(){

  function _Declaration(configString){
    // TODO: Perhaps use defaults
    this.name = name; // the name of the property or method
    this.required = null; // Boolean
    this.type = null; // string, array, interface, function, boolean, etc
    this.method = null; // Boolean
    this._parseCfg(configString);
  }

  _Declaration.prototype._parseCfg = function(configString){
    // TODO: includes is a new feature. Use regex here. 
    var isMethod = configString.includes('()');
    var isRequired = configString.includes('?') && configString[0] === '?';
    var type = configString.includes(':') ? configString.split(':')[1] : null;

    this.required = isRequired;
    this.method = isMethod; 
    this.type = type; // TODO: Eventually this will need to lookup existing interfaces
    this.name = this._parseName(configString);
  };

  _Declaration.prototype._parseName = function(configString){
    configString = this.type ? configString.split(':')[0] : configString;
    configString = this.required ? configString.substr(1) : configString;
    configString = this.method ? configString.slice(0, -2) : configString;
    return configString;
  };

  _Declaration.prototype.validate = function(argument){
     // TODO 
  };
  return _Declaration;

})();





module.exports = Declaration;