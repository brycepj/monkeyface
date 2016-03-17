class RegistryService {
  public map: Object;
  
  constructor() {
    this.map = {};
  }
  create(Interface) {
    return this.map[Interface.name] = Interface;
  };

  register(Interface) {
    this.map[Interface.name] = Interface;
  };

  check() {
    return false || true;
  }
  get() {
    var i = 0;
    return i;
  }
  listKeys(){
    return Object.keys(this.map);
  }
}

export = new RegistryService();