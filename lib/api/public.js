var InterfaceFactory = $require('services/InterfaceFactory');

exports = {
  create: InterfaceFactory.createInterface,
  register: InterfaceFactory.registerInterface,
  config: InterfaceFactory.configureFactory
};
