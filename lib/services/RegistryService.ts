class RegistryService {
  public map: Object;
  
  constructor() {
    this.map = {};
  }
  create(iface) {
    this.map[iface.name] = iface;
  };

  register(iface) {
    this.map[iface.name] = iface;
  };

  check(key) {
    return !!this.map[key];
  }
  get(key) {
    return this.map[key];
  }
  listKeys(){
    return Object.keys(this.map);
  }
}

export = new RegistryService();