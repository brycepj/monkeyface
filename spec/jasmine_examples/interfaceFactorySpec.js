describe("Interface Factory", function(){
  var InterfaceFactory = require("../../lib/services/InterfaceFactory");
  var Interface = require('../../lib/models/Interface');

  describe("Creator", function(){
    it("should return a valid interface object", function(){
      var newInterface = InterfaceFactory.create(['rando', 'mcbando()']);
      expect(newInterface).toEqual(jasmine.any(Interface));
    });

  });

  describe("Validate", function(){

  });

});