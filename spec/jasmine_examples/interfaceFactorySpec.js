describe("Interface Factory", function(){
  var InterfaceFactory = require("../../lib/services/InterfaceFactory");
  var Interface = require('../../lib/models/Interface');
  var mock = require('../../lib/services/mock');

  it("should be a singleton", function(){
    var secondInterfaceFactory = require("../../lib/services/InterfaceFactory");
    expect(InterfaceFactory).toEqual(secondInterfaceFactory);
  });

  describe("Creator", function(){
    it("should correctly parse an array as config", function(){
      var firstProp = 'rando';
      var firstMethod = 'mcBando()';
      var newInterface = InterfaceFactory.create([firstProp, firstMethod]);
      var props = newInterface.props;
      var methods = newInterface.methods;
      expect(props[0]).toEqual(firstProp);
      expect(methods[0]).toEqual(firstMethod);
    });

    it("should correctly parse an object as config", function(){
      var mockObj = mock.Obj;
      var newInterface = InterfaceFactory.create(mockObj);
      var name = newInterface.name;
      var props = newInterface.props;
      var methods = newInterface.methods;

      expect(props).toBeDefined();
      expect(methods).toBeDefined();
      expect(name).toBeDefined();
    });

    it("should return a valid interface object", function(){
      var newInterface = InterfaceFactory.create(['rando', 'mcbando()']);
      expect(newInterface).toEqual(jasmine.any(Interface));
    });

    it("should properly register an interface on the global scope", function(){
      var newInterface = InterfaceFactory.create(['rando', 'mcbando()']);

    })

  });

  describe("Validate", function(){

  });

});