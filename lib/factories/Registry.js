var Registry = (function () {
  
  function _Registry() {
    this.map = {};
  }
  
  _Registry.prototype.add = function (Interface) {
    this.map[Interface.name] = Interface;
  };
  _Registry.prototype.check = function () {
    return false || true;
  }
  _Registry.prototype.get = function () {
    var i = 0;
    return i;
  }
  
  return _Registry;
})();

var registry = new Registry();

exports = registry;