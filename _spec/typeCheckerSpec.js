describe("TypeChecker", function() {
	var typeChecker = require("../../lib/services/typeChecker");
	var u = require('../../lib/services/utils');
	var mock = require('../../lib/services/mock');
	
	it("should return a valid API", function(){
		
		var allAreFunctions = u.everyIn(typeChecker, function(val, key){
			return typeof val === 'function';
		});
		
		expect(allAreFunctions).toBeTruthy();
		expect(typeChecker).toBeTruthy();
	});
	
	describe("Methods", function(){
		var types = mock.Arr;
		
		describe("isArray", function(){
			var fn = typeChecker.isArray;
			
			it("should pass exactly one value from types collection", function(){
				var truthyValues = types.filter(function(val, index){
					return fn(val); 
				});
				expect(truthyValues.length).toEqual(1);
			});
			
		});
		
		describe("isString", function(){
			var fn = typeChecker.isString;
			
			it("should pass exactly one value from types collection", function(){
				var truthyValues = types.filter(function(val, index){
					return fn(val); 
				});
				expect(truthyValues.length).toEqual(1);
			});
			
		});
		
		describe("isBoolean", function(){
			var fn = typeChecker.isBoolean;
			
			it("should pass exactly one value from types collection", function(){
				var truthyValues = types.filter(function(val, index){
					return fn(val); 
				});
				expect(truthyValues.length).toEqual(1);
			});
			
		});
		
		describe("isNumber", function(){
			var fn = typeChecker.isNumber;
			
			it("should pass exactly one value from types collection", function(){
				var truthyValues = types.filter(function(val, index){
					return fn(val); 
				});
				expect(truthyValues.length).toEqual(1);
			});
			
		});
		
		describe("isError", function(){
			var fn = typeChecker.isError;
			
			it("should pass exactly one value from types collection", function(){
				var truthyValues = types.filter(function(val, index){
					return fn(val); 
				});
				expect(truthyValues.length).toEqual(1);
			});
			
		});
		
		describe("isNull", function(){
			var fn = typeChecker.isNull;
			
			it("should pass exactly one value from types collection", function(){
				var truthyValues = types.filter(function(val, index){
					return fn(val); 
				});
				expect(truthyValues.length).toEqual(1);
			});
			
		});
		
		describe("isFunction", function(){
			var fn = typeChecker.isFunction;
			
			it("should pass exactly one value from types collection", function(){
				var truthyValues = types.filter(function(val, index){
					return fn(val); 
				});
				expect(truthyValues.length).toEqual(1);
			});
			
		});
		
		describe("isObject", function(){
			var fn = typeChecker.isObject;
			
			it("should pass exactly one value from types collection", function(){
				var truthyValues = types.filter(function(val, index){
					return fn(val); 
				});
				expect(truthyValues.length).toEqual(1);
			});
			
		});
		
		
		
	});
	
	
	
	
	
});