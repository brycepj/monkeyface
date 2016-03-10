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
    var cfg = {
			name: 'superSweetInterface',
			declarations: [
				'helloProp', 
				'helloMethod()', 
				'?helloOptionalProp', 
				'?helloOptionalMethod',
				'helloProp2:string',
				'helloProp3:string[]', 
				'helloProp4:secondInterface'
			]
			};
			
      var newInterface = InterfaceFactory.create(cfg.name, cfg.declarations);
      var declarationsWithNulls = newInterface.declarations.find(function (value, index, obj) {
				return value.name == null || value.required == null || value.method == null;
			})
			
			expect(newInterface).toBeDefined();
			expect(newInterface.declarations).toBeDefined();
			expect(newInterface.name).toBeDefined();
			expect(newInterface.declarations.length).toEqual(cfg.declarations.length);
			expect(newInterface.name).toEqual(cfg.name);
			expect(declarationsWithNulls).toBeUndefined();
			
    });

    it("should correctly parse an object as config", function(){
      var mockObj = mock.Obj;
			var interfaceName = 'yayQuery';
      var newInterface = InterfaceFactory.create(interfaceName, mockObj);
      
      var declarationsWithNulls = newInterface.declarations.find(function (value, index, obj) {
				return value.name == null || value.required == null || value.method == null;
			});
			
			expect(newInterface).toBeDefined();
			expect(newInterface.declarations).toBeDefined();
			expect(newInterface.name).toBeDefined();
			expect(newInterface.declarations.length).toEqual(Object.keys(mockObj).length);
			expect(newInterface.name).toEqual(interfaceName);
			expect(declarationsWithNulls).toBeUndefined();
    });


  });

  describe("EnsureImplements", function(){
		it("method should exist on InterfaceFactory", function () {
			expect(InterfaceFactory.ensureImplements).toBeTruthy();
		});
  });

});
