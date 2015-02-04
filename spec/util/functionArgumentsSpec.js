define([
	'hawk/util/functionArguments'
], function(
	functionArguments
){
	'use strict';
	describe('getArray', function() {
		var tester = function tester() {
			return functionArguments.getArray(arguments);
		};
		it('should return the first element if array', function() {
			var a = tester('a', 'b');
			expect(a).toEqual(['a', 'b']);
		});
	});
	
});